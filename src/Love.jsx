import { useEffect, useMemo, useState } from "react";
import bgVideo from "./assets/bgl2.mp4";
import { FaArrowRightLong } from "react-icons/fa6";
import Swal from "sweetalert2";

const Love = () => {
  const sentences = useMemo(
    () => [
      "Hey Perakka kutti ",
      "Sugalle anak 👀",
      "Iyy vicharikndavum what coconut🥥 is this ",
      "lleee 😌",
      "jst see 😜😎",
      "Ee dance patt onnm enk nadakoola 🥴",
      "pinne aake illath dhaa ithan 💻",
      "appo paranj vannath nthann vechal ",
      "Sabaron ki zindagi jo kabhi nahi kadam ho jate hai",
      "manassilayillalloo",
      "nnlm kedakate oru punchn 😝",
      "So Lets come to the point 📌",
      "Inne pattit lla oru karym aan parayn povne 🫣",
      "ikkalamathrayum jeevichath ottak ( I mean single 🥲)",
      "Ippo llathm angne thannee 🚶",
      "Pakshe edak eppolo oru ullil oru aagrhm ",
      "Koode oral koodi venm enn 😁😜",
      "Aagrhm mathrm indayit karyallallo aal koodi vende 🚶",
      "Angne aa aagrahm safaleekarikan orale thedi erangi 🚲",
      "kalam korach aayi ttoo",
      "Pakshe enthoo manass aareyum angt sammayknilla 🫠",
      "Angne ann avde ",
      "Majnu nte laila ne ppole 😁",
      "Moideen nte kanjana mala ne pole 😉",
      "Nee vannu 🫵🏼🥺",
      "Aadym onnm manass sammaychila 🫣",
      "pakshe ante aa chiriku munnil manassin adiyarav parayandi vannu 🥹🥺",
      "That moment, aa nimisham",
      "Appo orapichatha njan",
      "U r the one 🫵🏼❤️",
      "The one i have been waiting for 🥰",
      "Njn kandethm enn panikar paranja penkutti 😉",
      "Njn ithrayum kalam thiranjath ninak vendi aayirunnu enn",
      "Appo engnaa 😁",
      "Povallee",
      "kanana chayayil aadu mekkan 😌😎",
    ],
    []
  );

  const [text, setText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (sentenceIndex >= sentences.length) {
      setShowOptions(true);
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
      setShowOptions(true);
    }
  };

  const handleYes = () => {
    console.log("hello")
    Swal.fire({
      title: "Yay! ❤️",
      text: "I knew It, I know it was a Yes 😎🎉",
      timer: 3000,
      // showLoaderOnConfirm: true,
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup", // Apply a custom class
      },
      // willClose: () => navigate("/celebration"),
      willClose: () => {
        Swal.fire({
          text : "Inippo Flower kitteella nn lla parathi venda  Athm settakikkn Wait 😎",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          customClass: {
            popup: "custom-swal-popup2", // Apply a custom class
          },
          willClose: () => {
            window.location.href = "https://hashimrahman.github.io/flower/"; // Replace with the target URL
          }
        })
      },
    });
  };

  const handleNo = () => {
  Swal.fire({
    title: "No no no no nooo!",
    text: "Njn Sammaykoola",
    timer: 3000,
    showConfirmButton: false,
    showCloseButton: true,
    timerProgressBar: true,
    customClass: {
      popup: "custom-swal-popup2",
      closeButton: "custom-swal-close",
    },
    willClose: () => {
      console.log("Closed via timer or close button");

      // 👉 your logic here
    },
  });
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
          <span key={cls} className={`heart ${cls}`}>❤️</span>
        ))}
      </div>

      {!showOptions && (
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

      {!showOptions ? (
        <button
          onClick={handleNextSentence}
          className="next-button text-lg flex gap-3 justify-center items-center font-semibold uppercase z-20"
        >
          Next
          <FaArrowRightLong className="arrow-icon" />
        </button>
      ) : (
        <div className="buttons-fade-in flex gap-6 mt-4 z-10 flex-wrap justify-center px-4">
          <button
            className="yes-button px-20 py-4 text-xl font-bold rounded-full"
            onClick={handleYes}
          >
            Yes ❤️
          </button>
          <button
            className="no-button px-14 py-4 text-lg font-semibold rounded-full"
            onClick={handleNo}
          >
            No 😭💔
          </button>
        </div>
      )}
    </div>
  );
};

export default Love;
