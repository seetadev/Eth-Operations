import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();

  return (
    <main className="max-w-[1100px] mx-auto">
      <section className="mx-auto flex flex-col items-center justify-center min-h-[90vh]">
        <h1 className="text-[3em] md:text-[4em] lg:text-[7em] flex flex-col gap-5 text-center font-bold font-neueMachinaBold text-balance md:leading-[auto] lg:leading-tight text-black">
          <span className="bg-orange-400 lg:pt-5 px-2 leading-tight">
          Record Attendence
          </span>{" "}
          <span>
            <span className="bg-fuchsia-500 pt-5 px-2">Attest</span>{" "}
            <span className="bg-fuchsia-500 pt-5 px-2">Attendence</span>
          </span>
        </h1>
        <p className="text-[1.5em] md:text-[2em] mt-4 text-center font-bold">
          here....
        </p>
        <div className="flex gap-5">
          <button onClick={()=> navigate("/a")} className="mt-10 mx-auto flex gap-2 px-6">
           Get Started 
          </button>
        </div>
      </section>
    </main>
  );
}
