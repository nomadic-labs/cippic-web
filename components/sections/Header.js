export default function Header({ className="bg-dark", children }) {

    return (
      <section role="banner" className={`section-md position-relative overflow-hidden ${className}`}>
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">
              {children}
            </div>
          </div>
        </div>
      </section>
    )
}
