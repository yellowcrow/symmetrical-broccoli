
import React, { useEffect, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import Big from 'big.js';

function normalizeToStep(nextValue: number, safeStep: number) {
  const steps = new Big(nextValue).div(safeStep);
  const roundedSteps = steps.round(0, Big.roundHalfUp);
  const normalized = roundedSteps.times(safeStep);
  return normalized.toNumber();
}

export type DecimalStepperProps = {
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
};

export const DecimalStepper: React.FC<DecimalStepperProps> = ({
  step = 1,
  initialValue = 0,
  onChange,
}) => {
  const safeStep = useMemo(() => {
    const s = Number(step);
    if (!Number.isFinite(s) || s === 0) return 1;
    return Math.abs(s);
  }, [step]);

  const [value, setValue] = useState<number>(() =>
    normalizeToStep(initialValue, safeStep),
  );
  const [draft, setDraft] = useState<string | null>(null);

  useEffect(() => {
    setValue((v) => normalizeToStep(v, safeStep));
  }, [safeStep]);

  useEffect(() => {
    setDraft(null);
    setValue(normalizeToStep(initialValue, safeStep));
  }, [initialValue]);

  const displayValue = draft !== null ? draft : String(value);

  const commitParsed = (raw: string) => {
    const trimmed = raw.trim();
    const parsed = trimmed === '' ? 0 : Number(trimmed);
    const normalized = Number.isNaN(parsed)
      ? value
      : normalizeToStep(parsed, safeStep);
    setValue(normalized);
    onChange?.(normalized);
    setDraft(null);
  };

  const updateValue = (nextValue: number) => {
    const normalized = normalizeToStep(nextValue, safeStep);
    setValue(normalized);
    setDraft(null);
    onChange?.(normalized);
  };

  const handleFocus = () => {
    setDraft(String(value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value);
  };

  const handleBlur = () => {
    if (draft === null) return;
    commitParsed(draft);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Button onClick={() => updateValue(value - safeStep)}>-</Button>

      <TextField
        value={displayValue}
        onFocus={handleFocus}
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="number"
        inputMode="decimal"
        size="small"
        sx={{ width: 120 }}
      />

      <Button onClick={() => updateValue(value + safeStep)}>+</Button>
    </div>
  );
};

const meta: Meta<typeof DecimalStepper> = {
  title: 'Components/DecimalStepper',
  component: DecimalStepper,
  args: {
    step: 0.5,
    initialValue: 1,
  },
  argTypes: {
    step: {
      control: { type: 'number', min: 0.01, step: 0.01 },
      description: 'Шаг (лотность). Итоговое значение всегда кратно этому числу.',
    },
    initialValue: {
      control: { type: 'number' },
      description: 'Начальное значение для поля.',
    },
    onChange: {
      action: 'onChange',
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DecimalStepper>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.initialValue ?? 0);

    useEffect(() => {
      setValue(args.initialValue ?? 0);
    }, [args.initialValue]);

    return (
      <div>
        <DecimalStepper
          {...args}
          initialValue={value}
          onChange={setValue}
        />
        <div style={{ marginTop: 12 }}>
          Value (committed on blur / buttons): {value}
        </div>
      </div>
    );
  },
};
