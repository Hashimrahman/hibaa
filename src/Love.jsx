import { useEffect, useMemo, useState } from "react";
import bgVideo from "./assets/bgl2.mp4";
import { FaArrowRightLong } from "react-icons/fa6";

const Love = () => {
  const sentences = useMemo(
    () => [
      "hellooo babyy!!😌🫶🏻",
      "assalamu alaikumm",
      "ndhhaa paadd sugellee",
      "idhh ppo ndhha ival aych thanne nn vchrkkndvm lee",
      "onnulyyaa vrdhe oru reslle idhekke🤓",
      "njmml jst 1 yr maathrm aan oru clsill ndynedhh but we became so close by that time",
      "ethra pettennaale njmml adthee",
      "sthymm prnja ippo nte koode illa aarekatluu annet eytt eykku njn close aayt ille",
      "you know a lot abt me than they do",
      "andd i am soo lucky to have youu",
      "shrkkm nallm miss eyyn ndd🥲",
      "i really miss your kadikkel aan kaaatteling me🙂",
      "ini ennaa anne kaana enna adhekke onn kittaa",
      "tution kynjj schoolkk ethmbo miss clsl attendance edkkan thodngeet ndvmm nnt njmml porth aan koodthel divsm ndvl illee",
      "mikka divsm njmml rndalm mthre girls ndvl llu adhekke shrkkm miss eyyn nd",
      "aahmm ndheyyana ini adhonnu thrchh verulaalo",
      "btw ini nammakk krythilekk kadkkaam",
      "actually inn njn kore plan itteenu",
      "pashee onnu nadnneela so oru kunji giftt or whatever",
      "you know what you are really an adipoly person",
      "ante aa thakkaali mokhavm chund kond illa kooprayanglm",
      "pnne your main item.... adh ndhaann njn pryn illa hope you understand 😌",
      "aa dance ekke ini enna nkk kanan kayya",
      "sthym prnjjaa nee oru killaadi thanne aan😹",
      "anyway shuttumaniiii krche late aaykn nn aryaa",
      "korch alla krche thoone late aaykn nnalum",
      "haappyy berthdaayyy baabbygirll🐒💋",
      "santhoooshaylee nte kuttikk🙂‍↔️🫶🏻",
      "luvvv yoouuhhh💗",
      "mwahhhh💋",
    ],
    []
  );

  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showBirthday, setShowBirthday] = useState(false);
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, index) => ({
        id: index,
        left: `${(index * 17) % 100}%`,
        delay: `${(index % 12) * 0.12}s`,
        duration: `${2.8 + (index % 5) * 0.25}s`,
        rotation: `${(index * 37) % 360}deg`,
      })),
    []
  );

  useEffect(() => {
    if (sentenceIndex >= sentences.length) {
      setShowBirthday(true);
      return;
    }

    const currentSentence = sentences[sentenceIndex];

    if (charIndex < currentSentence.length) {
      const timeout = setTimeout(() => {
        setText(currentSentence.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, sentenceIndex, sentences]);

  const handleNextSentence = () => {
    if (sentenceIndex < sentences.length - 1) {
      setText("");
      setCharIndex(0);
      setSentenceIndex((prev) => prev + 1);
    } else {
      setShowBirthday(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="video-overlay" />

      <div className="floating-hearts pointer-events-none absolute inset-0 z-[5]">
        {Array.from({ length: 12 }, (_, i) => `heart-${i + 1}`).map((cls) => (
          <span key={cls} className={`heart ${cls}`}>
            ❤️
          </span>
        ))}
      </div>

      {showBirthday && (
        <>
          <div className="confetti-pop pointer-events-none absolute inset-0 z-[15]">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  animationDuration: piece.duration,
                  "--rotation": piece.rotation,
                }}
              />
            ))}
          </div>

          <div className="birthday-card relative z-20 mx-4 max-w-3xl w-full text-center">
            <h1 className="birthday-title">Happy Birthday</h1>
            <p className="birthday-message">Wishing you the happiest day ever.</p>
          </div>
        </>
      )}

      {!showBirthday && (
        <div
          key={sentenceIndex}
          className="text-card relative z-10 mx-4 max-w-3xl w-full"
        >
          <h1
            className={`mb-2 text-center ${
              sentenceIndex === 0 ? "cursive-text" : "roboto-text"
            }`}
          >
            {text}
            <span className="cursor-blink" aria-hidden="true"></span>
          </h1>
        </div>
      )}

      {!showBirthday && (
        <button
          onClick={handleNextSentence}
          className="next-button text-lg flex gap-3 justify-center items-center font-semibold uppercase z-20"
        >
          Next
          <FaArrowRightLong className="arrow-icon" />
        </button>
      )}
    </div>
  );
};

export default Love;
