"use client";

interface SpinnerProps {
  message?: string;
  className?: string;
}

export function Spinner({
  message = "녹음본을 서버에 전송하고 있습니다...",
  className = ""
}: SpinnerProps) {
  return (
    <section
      className={`box-border inline-flex flex-col gap-5 items-center px-4 py-8 rounded-2xl bg-stone-700 bg-opacity-90 h-[158px] w-[206px] `}
    >
      <div className="flex relative justify-center items-center p-0.5 w-16 h-16">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin absolute left-0.5 top-0.5"
          style={{
            width: "60px",
            height: "60px",
            flexShrink: 0,
          }}
        >
          <path
            d="M54.5 30C54.5 26.7826 53.866 23.5965 52.6348 20.624C51.4035 17.6517 49.5992 14.9507 47.3242 12.6758C45.0493 10.4008 42.3483 8.59647 39.376 7.36523C36.4035 6.13399 33.2174 5.5 30 5.5C28.6193 5.5 27.5 4.38071 27.5 3C27.5 1.61929 28.6193 0.5 30 0.5C33.8739 0.5 37.71 1.26267 41.2891 2.74512C44.8682 4.22763 48.12 6.4013 50.8594 9.14062C53.5987 11.88 55.7724 15.1318 57.2549 18.7109C58.7373 22.29 59.5 26.1261 59.5 30C59.5 31.3807 58.3807 32.5 57 32.5C55.6193 32.5 54.5 31.3807 54.5 30Z"
            fill="#FF8B6E"
          />
        </svg>
      </div>

      <div className="relative text-xs font-medium text-zinc-50 max-md:text-xs max-sm:text-xs">
        <p className="text-xs text-zinc-50 max-md:text-xs max-sm:text-xs">
          {message}
        </p>
      </div>
    </section>
  );
}

export default Spinner;
