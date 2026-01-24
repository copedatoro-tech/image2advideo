'use client';

type Props = {
  image: string | null;
  isPlaying: boolean;
};

export default function Preview({ image, isPlaying }: Props) {
  return (
    <div
      style={{
        width: 400,
        height: 400,
        border: '2px solid #ccc',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        background: '#111',
        color: '#fff',
      }}
    >
      {!image && <span>Preview indisponibil</span>}

      {image && !isPlaying && (
        <img
          src={image}
          alt="Preview"
          style={{ maxWidth: '100%', borderRadius: 8 }}
        />
      )}

      {image && isPlaying && (
        <span>▶️ Redare preview video...</span>
      )}
    </div>
  );
}
