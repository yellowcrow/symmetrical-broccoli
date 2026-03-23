import { useMemo } from 'react';
import { Typography } from '@mui/material';
import Decimal from 'decimal.js';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

type Locale = 'en-US' | 'ru-RU' | 'de-DE';

interface DecimalViewerProps {
  value: number | string | Decimal;
  decimalPlaces: number;
  locale?: Locale;
}

const formatDecimal = (value: Decimal, locale: Locale, decimalPlaces: number = 2): string => {
  // Проверяем пограничные случаи
  if (value.isNaN() || !value.isFinite()) {
    return '-';
  }

  // Преобразуем в строку с фиксированным числом знаков после запятой
  const fixedString = value.toFixed(decimalPlaces);
  
  // Разбиваем на целую и дробную части
  const [integerPart, fractionalPart] = fixedString.split('.');
  const cleanFractionalPart = fractionalPart.replace(/0+$/, '');
  
  // Форматируем целую часть (разбиваем на тройки)
  let formattedInteger = integerPart;
  if (integerPart.length > 3) {
    const isNegative = integerPart.startsWith('-');
    const absInteger = isNegative ? integerPart.slice(1) : integerPart;
    
    // Разбиваем на тройки справа налево
    const groups = [];
    for (let i = absInteger.length; i > 0; i -= 3) {
      const start = Math.max(0, i - 3);
      groups.unshift(absInteger.slice(start, i));
    }
    
    formattedInteger = (isNegative ? '-' : '') + groups.join(getThousandsSeparator(locale));
  }
  
  // Соединяем всё вместе
  if (cleanFractionalPart && decimalPlaces > 0) {
    return formattedInteger + getDecimalSeparator(locale) + cleanFractionalPart;
  }
  
  return formattedInteger;
};

const getThousandsSeparator = (locale: Locale): string => {
  switch (locale) {
    case 'en-US': return ',';
    case 'ru-RU': return ' ';
    case 'de-DE': return '.';
    default: return ',';
  }
};

const getDecimalSeparator = (locale: Locale): string => {
  switch (locale) {
    case 'en-US': return '.';
    case 'ru-RU': return ',';
    case 'de-DE': return ',';
    default: return '.';
  }
};

const DecimalViewer = ({value, decimalPlaces, locale="ru-RU"} : DecimalViewerProps) => {
  
    const formatted = useMemo(() => {
        try {
            return formatDecimal(new Decimal(value), locale, decimalPlaces);
        } catch {
            return "0"; // fallback
        }
    }, [value, decimalPlaces, locale]);


    return <Typography>{formatted}</Typography>;
};

// Обёртка для Storybook, чтобы можно было передавать обычные значения
const Wrapper = (props: Omit<DecimalViewerProps, 'value'> & { value: number | string }) => {
  return <DecimalViewer {...props} value={new Decimal(props.value)} />;
};

// Декоратор с темой MUI
const withMuiTheme = (Story: React.ComponentType) => (
  <ThemeProvider theme={createTheme()}>
    <Story />
  </ThemeProvider>
);

const meta: Meta<typeof Wrapper> = {
  title: 'Components/DecimalViewer',
  component: Wrapper,
  decorators: [withMuiTheme],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Числовое значение для отображения',
    },
    decimalPlaces: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Количество знаков после запятой',
    },
    locale: {
      control: { type: 'radio' },
      options: ['en-US', 'ru-RU', 'de-DE'],
      description: 'Локаль для форматирования',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Default: Story = {
  args: {
    value: 1234.567,
    decimalPlaces: 2,
    locale: 'ru-RU',
  },
};