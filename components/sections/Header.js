import Circles from '@/components/svgs/circles'

export default function Header({ children }) {

    return (
      <section className="section-default position-relative bg-two overflow-hidden">
        <Circles />
        <div className="container position-relative">
          <div className="row">
            <div className="col-12">

              <div className="padding-xl bg-one rounded-sm page-header">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
