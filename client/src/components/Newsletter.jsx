function Newsletter() {
  return (
    <div
      className="bg-white border-top border-bottom text-center d-flex flex-column align-items-center justify-content-center"
      style={{ width: '100%', height: '190px' }}
    >
      <h5 className="fw-bold">Subscribe on our newsletter</h5>
      <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <div className="d-flex justify-content-center gap-2">
        <input
          type="email"
          className="form-control"
          placeholder="✉️  Email"
          style={{ width: '300px' }}
        />
        <button className="btn btn-primary px-4">Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter