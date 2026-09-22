const MAIN_TEXT =
  "I like building solutions that are both functional and thoughtful, which is why computer science felt right. This fall, I joined the Centre for Entrepreneurship and Engineering Design (CEED) as a Full Stack Developer, where I'll be exploring tools like Linux and AWS S3.";

const PS_TEXT =
  "P.S. View this on a laptop to catch the interactive details since I've added a few (okay, a lot) of hover effects into the UI for you to discover.";

export function ElevatorPitch() {
  return (
    <div className="w-full space-y-4 border-l-4 border-neutral-200 dark:border-neutral-700 pl-5">

      {/* Main pitch */}
      <p className="text-left text-base leading-relaxed text-neutral-900 dark:text-white">
        {MAIN_TEXT}
      </p>

      {/* PS */}
      <p className="text-left text-sm italic leading-relaxed text-neutral-500 dark:text-neutral-400">
        {PS_TEXT}
      </p>
    </div>
  );
}
