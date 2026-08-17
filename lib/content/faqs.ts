/**
 * FAQ sets, one per route. Each set drives both the visible markup and the
 * FAQPage JSON-LD, so the two cannot drift apart.
 *
 * Wellness framing only. No claim that PEMF diagnoses, cures, mitigates,
 * prevents, or treats any disease.
 */
import type { FaqItem } from "./types";

export const pemfFaqs: FaqItem[] = [
  {
    q: "What is PEMF?",
    a: "PEMF stands for Pulsed Electro Magnetic Field. It is a wellness technology that uses extremely low frequency, low intensity magnetic pulses that mimic the Earth's own magnetic field energy.",
  },
  {
    q: "How does PEMF mimic the Earth's magnetic field?",
    a: "The Earth produces a natural magnetic field that life evolved within. A PEMF system reproduces comparable extremely low frequencies, between roughly 0.5 and 25 Hz, so the signals are ones the body recognizes.",
  },
  {
    q: "Why does the Earth's magnetic field matter for wellness?",
    a: "The magnetosphere shields the planet from solar and cosmic radiation, and the field is an environmental factor human biology developed alongside. That field is weakening while electro-smog increases.",
  },
  {
    q: "Is PEMF safe to use at home?",
    a: "PEMF systems for wellness use are non-invasive and non-addictive, and are used at home or in an office session. The system is not a medical device and is not intended to diagnose, cure, mitigate, prevent or treat any disease.",
  },
];

export const benefitsFaqs: FaqItem[] = [
  {
    q: "Does PEMF help with sleep?",
    a: "PEMF is used as a non-invasive, non-addictive, drug-free approach to winding down. People use it to relax before bed, and deep sleep is when physical and mental rejuvenation happens.",
  },
  {
    q: "Can PEMF help with stress and relaxation?",
    a: "Many people use PEMF as a healthy coping mechanism. A session can support relaxation within minutes, helping the body return to a calm and balanced state at home or in the office.",
  },
  {
    q: "Does PEMF support athletic performance and recovery?",
    a: "Within elite and mass sports, PEMF is used as a passive warm-up alongside an active one, and to support rejuvenation after physical activity so you can train and compete more often.",
  },
  {
    q: "Is PEMF safe for pets and animals?",
    a: "iMRS Fauna PEMF is non-invasive and used with pets, show animals, and racehorses. Many animals experience it as soothing and settle onto the applicator on their own.",
  },
  {
    q: "How long is a typical PEMF session?",
    a: "Sessions are short and can be repeated through the day. Your certified PEMF consultant will set a schedule that suits you during your appointment.",
  },
];

export const productFaqs: FaqItem[] = [
  {
    q: "What is the difference between the iMRS Prime and the Smart Pulser?",
    a: "The iMRS Prime is the six-dimensional system with the full Exagon applicator range, including FIR, Pad, Spot, Sense and Brain. The Smart Pulser is the more affordable benchmark system for use at home or abroad, built on Inductive Fiber Coil Technology.",
  },
  {
    q: "What is Brainwave Entrainment?",
    a: "Also called the Spa for the Mind, it combines photic, chromatic and audible stimulation for deeper brain relaxation, delivered through the Exagon Brain.",
  },
  {
    q: "What does split mode do?",
    a: "Split mode lets one control unit run two stand-alone applications at the same time, so two people can use the system together.",
  },
  {
    q: "Why does the Smart Pulser stay below 25 Hz?",
    a: "It works within the Extremely Low Frequency range, roughly 0.5 to 25 Hz, so the energy delivered is gentle and tuned to the natural windows of cellular communication rather than overwhelming the body with power.",
  },
];

export const contactFaqs: FaqItem[] = [
  {
    q: "Do you offer home visits?",
    a: "Yes. Office and home visits are both available across Orange County, California.",
  },
  {
    q: "Where are you located?",
    a: "22706 Aspan St, Suite 504, Lake Forest, CA 92630.",
  },
  {
    q: "How do I book a session?",
    a: "Call, text, or message on WhatsApp at (949) 891 5572 to arrange an appointment with your certified PEMF consultant.",
  },
];
