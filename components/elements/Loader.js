import { MutatingDots } from  'react-loader-spinner'

export default function Loader({visible=true, color}) {
    return (
        <MutatingDots 
          height="100"
          width="100"
          color={color}
          secondaryColor={color}
          radius='12.5'
          aria-label="Loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={visible}
         />
    )
}
