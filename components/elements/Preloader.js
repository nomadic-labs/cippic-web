import { MutatingDots } from  'react-loader-spinner'

export default function Preloader() {
    return (
        <>
            <div className="preloader-wrap">
                <div className="preloader">
                    <MutatingDots 
                      height="100"
                      width="100"
                      color="var(--color-white)"
                      secondaryColor="var(--color-white)"
                      radius='12.5'
                      aria-label="Loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                     />
                </div>
                <div className="overlay" />
            </div>
        </>
    )
}
