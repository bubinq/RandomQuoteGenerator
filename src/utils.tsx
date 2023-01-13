import { Quote } from "./types";
export const key = import.meta.env.VITE_API_KEY;
export const url = import.meta.env.VITE_API_URL;

const synth = window.speechSynthesis
const voices = synth.getVoices();

export function utter(response: Quote) {
    synth.cancel();
    const utterence = new SpeechSynthesisUtterance(response.quote);
    utterence.voice = voices[Math.floor(Math.random() * (26 - 1) + 1)];
    synth.speak(utterence);
}