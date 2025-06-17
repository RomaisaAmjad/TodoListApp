import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function TypingEffect({
  words = ["Turn Your To-dos into Ta-das"],
  typingSpeed = 100,
  deleteSpeed = 100,
  delayBetweenWords = 600,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimationControls();

  const timerRef = useRef(null);

  useEffect(() => {
    const word = words[currentWordIndex];

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      timerRef.current = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, deleteSpeed);
      return;
    }

    if (currentText === word) {
      timerRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentText(word.substring(0, currentText.length + 1));
    }, typingSpeed);
  }, [currentText, currentWordIndex, isDeleting, words, typingSpeed, deleteSpeed, delayBetweenWords]);

  useEffect(() => {
    controls.start({
      opacity: [0.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, [controls]);

  return (
    <div className="w-full h-full flex items-center justify-center opacity-100">
      <div className="text-xl lg:text-xl font-mono font-bold text-white">
        {currentText}
        <motion.span animate={controls}>|</motion.span>
      </div>
    </div>
  );
}

export default TypingEffect;
