import { tickerItems } from "@/data";
import Container from "@/components/ui/Container";

export default function Ticker() {
  const track = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="ticker">
      <Container>
        <div className="ticker-track">
          {track.map((item, index) => (
            <span key={`${item}-${index}`} className="ticker-item">
              <span className="ticker-star" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
