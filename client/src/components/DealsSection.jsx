import { useState, useEffect } from 'react'

// Countdown Timer Hook
function useCountdown(targetSeconds) {
  const [time, setTime] = useState(targetSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const days = String(Math.floor(time / 86400)).padStart(2, '0')
  const hours = String(Math.floor((time % 86400) / 3600)).padStart(2, '0')
  const mins = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
  const secs = String(time % 60).padStart(2, '0')

  return { days, hours, mins, secs }
}

const deals = [
  { name: 'Smart watches', discount: '25', img: 'https://placehold.co/120x120' },
  { name: 'Laptops',       discount: '15', img: 'https://placehold.co/120x120' },
  { name: 'GoPro cameras', discount: '40', img: 'https://placehold.co/120x120' },
  { name: 'Headphones',    discount: '25', img: 'https://placehold.co/120x120' },
  { name: 'Canon cameras', discount: '25', img: 'https://placehold.co/120x120' },
]

function DealsSection() {
  const { days, hours, mins, secs } = useCountdown(4 * 86400 + 13 * 3600 + 34 * 60 + 56)

  return (
    <div className="container my-4">
      <div className="border rounded bg-white p-3">
        <div className="row align-items-center">

          {/* Left: Title + Timer */}
          <div className="col-md-2 border-end pe-3">
            <h6 className="fw-bold mb-0">Deals and offers</h6>
            <p className="text-muted mb-2" style={{ fontSize: '12px' }}>Hygiene equipments</p>

            {/* Countdown */}
            <div className="d-flex gap-1">
              {[{ val: days, label: 'Days' }, { val: hours, label: 'Hour' }, { val: mins, label: 'Min' }, { val: secs, label: 'Sec' }].map(({ val, label }) => (
                <div key={label} className="text-center bg-dark text-white rounded px-2 py-1" style={{ minWidth: '42px' }}>
                  <div className="fw-bold" style={{ fontSize: '14px' }}>{val}</div>
                  <div style={{ fontSize: '10px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Cards */}
          <div className="col-md-10">
            <div className="row row-cols-2 row-cols-md-5 g-2">
              {deals.map((deal, i) => (
                <div key={i} className="col">
                  <div className="border rounded p-2 text-center h-100" style={{ cursor: 'pointer' }}>
                    <img src={deal.img} alt={deal.name} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
                    <p className="mb-1" style={{ fontSize: '13px' }}>{deal.name}</p>
                    <span className="badge text-danger border border-danger bg-white">-{deal.discount}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DealsSection