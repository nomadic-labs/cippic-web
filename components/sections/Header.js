export default function Header({ children }) {

    return (
      <section className="section-default position-relative overflow-hidden bg-two">
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
