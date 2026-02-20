const items = [
  'Biotech',
  'Environment',
  'Testing',
  'Research',
  'Diagnostics',
  'Innovation',
];

export default function Ticker() {
  const track = [...items, ...items, ...items];

  return (
    <div className='ticker'>
      <div className='section-shell'>
        <div className='ticker-track'>
          {track.map((item, index) => (
            <span key={`${item}-${index}`} className='ticker-item'>
              <span className='ticker-star' aria-hidden='true' />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
