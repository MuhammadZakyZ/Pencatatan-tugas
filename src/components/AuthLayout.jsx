function AuthLayout({ title, description, children, footer }) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="brand" aria-label="Pencatatan Tugas">
          <span className="brand-mark" aria-hidden="true">
            PT
          </span>
          <span>Pencatatan Tugas</span>
        </div>
        <div className="auth-heading">
          <h1 id="auth-title">{title}</h1>
          <p>{description}</p>
        </div>
        {children}
        <div className="auth-footer">{footer}</div>
      </section>
    </main>
  )
}

export default AuthLayout
