'use client';

type Props = {
  onGenerate: () => void;
  onPlay: () => void;
  onReset: () => void;
  disabled: boolean;
};

export default function Controls({
  onGenerate,
  onPlay,
  onReset,
  disabled,
}: Props) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button onClick={onGenerate}>
        Generează preview
      </button>

      <button onClick={onPlay} disabled={disabled}>
        Play
      </button>

      <button onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
