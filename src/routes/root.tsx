import logos from '../constants/logos.js';
import Button from '../utilities/Button';

const Root = () => {

  return (
    <>
      <div className="w-screen h-screen bg-black">
        <div className="w-full h-14 bg-secondary mb-4 px-4 py-2 flex flex-row">
          <img src={logos.logo} alt="RouteDesigner logo" className="w-10 h-auto rounded-full" />
          <h1 className="text-white text-2xl font-bold px-2 py-1">RouteDesigner</h1>
          <Button
            text="Create"
            containerStyles="primary"
            textStyles="white"
            handleClick={() => { console.log("Create clicked") }} />
        </div>
        <div className="grid grid-cols-4 gap-4 w-full h-fit bg-black px-4">
          <div className="rounded-lg bg-secondary">
            <p>01</p>
            <p>02</p>
            <p>03</p>
          </div>
          <div className="rounded-lg bg-secondary col-span-2">02</div>
          <div className="rounded-lg bg-secondary">03</div>
        </div>
      </div>
    </>
  )
}

export default Root;