interface CartIconProps {
  count: number
}

export default function CartIcon({ count }: CartIconProps) {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ width: 24, height: 24 }}
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
        <circle cx="7" cy="21" r="1" />
        <circle cx="17" cy="21" r="1" />
      </svg>

      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: 12,
            fontWeight: 'bold',
            minWidth: 18,
            height: 18,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {count}
        </span>
      )}
    </div>
  )
}

