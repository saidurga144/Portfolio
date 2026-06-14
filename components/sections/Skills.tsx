"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Server, Lock } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LiquidGlassBox } from "@/components/ui/liquid-glass-button";

/* ─── Skill data ─── */
const frontendTech = [
  { label: "HTML",       color: "#E34F26" },
  { label: "CSS",        color: "#1572B6" },
  { label: "React",      color: "#61DAFB" },
  { label: "JavaScript", color: "#F7DF1E" },
  { label: "Node.js",    color: "#339933" },
  { label: "Express",    color: "#8B5CF6" },
];

const backendTech = [
  { label: "Java",       color: "#ED8B00" },
  { label: "Python",     color: "#3776AB" },
  { label: "REST APIs",  color: "#06B6D4" },
  { label: "MySQL",      color: "#4479A1" },
  { label: "MongoDB",    color: "#10B981" },
  { label: "PostgreSQL", color: "#336791" },
];

const devopsTech = [
  { label: "Git",    color: "#F05032" },
  { label: "GitHub", color: "#e0e0e0" },
  { label: "Docker", color: "#2496ED" },
  { label: "AWS",    color: "#FF9900" },
  { label: "Vercel", color: "#e0e0e0" },
  { label: "CI/CD",  color: "#06B6D4" },
];

const securityTech = [
  { label: "Network Security",    color: "#10B981" },
  { label: "Ethical Hacking",     color: "#F59E0B" },
  { label: "Vulnerability Scan",  color: "#EF4444" },
  { label: "Penetration Testing", color: "#8B5CF6" },
];

/* ─── SVG tech icons map ─── */
const techSVGs: Record<string, React.ReactNode> = {
  "HTML":       <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>,
  "CSS":        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.003-.237 2.608-6.68.01-.23 2.622 6.775.011-.337 3.42-2.83.76-2.91-.81-.19-2.113H6.247l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531l-.23-2.622 10.059.003.23-2.622z"/></svg>,
  "React":      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#61DAFB"><circle cx="12" cy="12" r="2.139"/><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" opacity="0"/><ellipse cx="12" cy="12" rx="10" ry="4.184" fill="none" stroke="#61DAFB" strokeWidth="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4.184" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.184" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/></svg>,
  "JavaScript": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#F7DF1E"><rect width="24" height="24" rx="2" fill="#F7DF1E"/><path d="M6.4 15.93c.36.59.83.98 1.65.98.7 0 1.14-.35 1.14-.83 0-.58-.46-.78-1.23-1.11l-.42-.18c-1.22-.52-2.03-1.17-2.03-2.54 0-1.27.96-2.23 2.47-2.23 1.07 0 1.84.37 2.4 1.34l-1.31.84c-.29-.52-.6-.72-1.09-.72-.5 0-.81.31-.81.72 0 .51.32.71 1.04 1.03l.42.18c1.43.61 2.25 1.24 2.25 2.64 0 1.51-1.19 2.36-2.78 2.36-1.56 0-2.57-.74-3.06-1.72l1.36-.78zm7.32.12c.26.46.5.85 1.08.85.55 0 .9-.22.9-1.06v-5.74h1.67v5.76c0 1.74-1.02 2.53-2.51 2.53-1.35 0-2.13-.7-2.53-1.54l1.39-.8z"/></svg>,
  "Node.js":    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#339933"><path d="M11.998 1.958a1.11 1.11 0 0 0-.557.148L3.072 6.865a1.108 1.108 0 0 0-.557.964v9.568c0 .396.216.762.557.964l8.369 4.759a1.11 1.11 0 0 0 1.113 0l8.369-4.759a1.11 1.11 0 0 0 .557-.964V7.83a1.11 1.11 0 0 0-.557-.964l-8.369-4.759a1.11 1.11 0 0 0-.556-.149zm-.001 1.302l7.81 4.44v8.6l-7.81 4.44-7.81-4.44V7.7l7.81-4.44z"/></svg>,
  "Express":    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#8B5CF6"><path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.504 1.66 1.66 0 00-.141-.59v-2.09zm1.181-.301h8.687c-.063-3.19-2.055-5.409-4.105-5.359-2.26.056-4.401 2.429-4.582 5.359z"/></svg>,
  "Java":       <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#ED8B00"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149zm-.546-2.527s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218zm4.84-4.595c1.157 1.332-.304 2.533-.304 2.533s2.933-1.516 1.585-3.418c-1.259-1.772-2.227-2.652 3.004-5.688 0 .001-8.216 2.051-4.285 6.573zm4.108 9.298s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.999.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.819zm-10.231-7.431s-4.36 1.036-1.543 1.412c1.188.159 3.553.123 5.756-.062 1.801-.152 3.609-.477 3.609-.477s-.635.272-1.094.585c-4.42 1.163-12.957.621-10.506-.567 2.076-1.007 3.778-.891 3.778-.891zm7.793 4.354c4.495-2.336 2.416-4.579.965-4.276-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.556 0-.001.07-.062.093-.121zm-7.968-14.064c-.001 0 2.244 2.244-2.127 5.695-3.504 2.766-.799 4.344-.001 6.148-2.045-1.844-3.545-3.469-2.541-4.979 1.482-2.223 5.59-3.302 4.669-6.864z"/></svg>,
  "Python":     <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#3776AB"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.031v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.19S18.28 0 11.914 0zm-3.21 1.839a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094zm12.043 2.13c0 0-3.403-.219-3.403 5.961 0 6.18 3.403 5.96 3.403 5.96H22.69v-2.867s.109-3.402-3.35-3.402H13.58s-3.24.052-3.24-3.13V2.656S10.83 0 17.195 0zm-3.044 1.839a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094zM6.2 12.039v2.752c0 0-.38 2.656 5.714 2.656 6.094 0 5.714-2.656 5.714-2.656v-2.752H12c-3.46 0-3.35 3.402-3.35 3.402h-2.45zm3.21 1.839a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094zm7.586 0a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z"/></svg>,
  "REST APIs":  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M9 9h.01M15 9h.01M9 12h6M9 15h6"/></svg>,
  "MySQL":      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#4479A1"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.252.246l.064.033.064-.049c.098-.106.145-.215.145-.332-.033-.036-.096-.065-.265-.065v.001zM2.954 15.006l.026-.063-5.005-4.985C2.954 9.958 5 10.14 5 10.14c3.054.358 3.907-1.41 3.907-1.41-1.073 1.47-3.908 1.222-3.908 1.222l.955-.956s.48 1.152 2.53 1.152c1.45 0 2.06-.48 2.435-.948l.005-.007c.007-.009.014-.018.02-.026v.028c0 .002.002.003.002.003l.002.003-.003-.006c.013.022.025.044.038.066l.002-.001c.01.02.021.038.03.057.001.003.002.006.004.009l.015.03c.004.008.008.016.013.024.003.006.007.013.01.019l.014.028c.004.008.008.016.012.025.003.006.006.013.009.019l.013.028.01.022.012.026.009.02.012.026.008.018.012.027.007.016.013.029.005.012.014.031.003.006.015.034v.001l.015.035v.001l.015.036v.001l.015.037v.001l.015.039v.001l.015.04v.001c.086.23.13.48.13.751 0 .94-.533 1.762-1.327 2.176l-.002.001c-.046.024-.094.046-.143.066l-.002.001C10.8 15.5 10.16 15.648 9.5 15.648c-.766 0-1.497-.204-2.123-.563h-.001C6.58 14.62 5.905 13.745 5.905 13h.028c.103.608.396 1.152.826 1.564.428.412.994.66 1.61.66.68 0 1.294-.26 1.747-.685.452-.425.73-1.012.73-1.665 0-.19-.025-.373-.072-.549l-.002-.007-.001-.004c-.02-.07-.044-.138-.072-.203l-.003-.006-.001-.003c-.016-.038-.033-.075-.052-.111l-.003-.006C10.5 11.935 10.3 11.9 10.3 11.9c-.095-.04-.196-.06-.3-.06-.348 0-.664.17-.87.434l-.007.01c-.207.264-.33.604-.33.974 0 .086.008.17.022.252l.002.01c.02.111.053.218.1.319l.004.009c.022.048.047.094.075.139l.003.005c.022.034.046.066.071.097l.003.004c.017.02.034.04.052.058l.003.003c.012.012.024.024.036.035l.003.003c.046.041.096.078.15.108l.004.002c.04.022.082.04.126.056l.004.001c.076.026.158.04.242.04.184 0 .353-.058.49-.155l.005-.004c.066-.047.125-.103.175-.166l.003-.004.002-.003a1.32 1.32 0 00.104-.19l.002-.004a1.334 1.334 0 00.048-.148l.002-.006a1.312 1.312 0 00-.005-.53l-.001-.006c-.013-.059-.03-.116-.051-.171l-.003-.007c-.021-.056-.047-.11-.077-.16l-.003-.005c-.03-.052-.064-.1-.102-.143l-.003-.004c-.038-.043-.08-.082-.126-.115l-.004-.003c-.046-.033-.095-.06-.148-.082l-.003-.002c-.053-.02-.11-.032-.168-.035l-.005-.001c-.013 0-.025-.001-.038-.001z"/></svg>,
  "MongoDB":    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#10B981"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.154-1.86-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>,
  "PostgreSQL": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#336791"><path d="M17.128 0a10.134 10.134 0 00-2.755.403l-.063.02A10.922 10.922 0 0012.6.258C11.422.238 10.41.524 9.594 1.1a.411.411 0 01-.089.047c-.065.025-.265.09-.334.1a4.658 4.658 0 01-.288.013 6.776 6.776 0 00-2.256.41C4.543 2.495 3.07 4.424 2.24 6.906c-.778 2.33-.882 4.887-.3 7.18.606 2.42 1.705 3.98 2.955 4.054.2.012.4-.04.59-.13a.968.968 0 00.56.535 2.095 2.095 0 00.667.109c.7 0 1.389-.299 1.96-.63l.08-.047c.23-.138.46-.278.647-.356l.103-.04.127-.038c.036-.01.072-.02.11-.027a.966.966 0 01.21-.022c.077 0 .154.01.23.028l.016.004.225.07.008.003c.42.149.88.229 1.358.238.51.01 1.002-.065 1.44-.216.047.06.097.118.152.172a.958.958 0 00.616.28c.254.02.507-.02.75-.123.327.155.688.233 1.059.23.343-.002.63-.062.854-.17l.037-.02c.37-.193.734-.52 1.02-1.09.305-.606.517-1.408.621-2.426l.004-.041.003-.041a53.723 53.723 0 00.127-5.566c-.01-.818-.028-1.575-.038-2.282-.005-.345-.008-.67-.008-.977v-.029c.002-.763.005-1.42-.024-2.074a.954.954 0 00-.045-.228l-.004-.014a.93.93 0 00-.27-.425A9.073 9.073 0 0017.128 0z"/></svg>,
  "Git":        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#F05032"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.658 2.66a1.838 1.838 0 11-1.102 1.103l-2.48-2.48v6.511a1.838 1.838 0 11-1.503-.05v-6.57A1.838 1.838 0 019.26 7.346L6.546 4.631 0 11.178a1.55 1.55 0 000 2.189l10.48 10.478a1.55 1.55 0 002.186 0l10.88-10.88a1.55 1.55 0 000-2.014z"/></svg>,
  "GitHub":     <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
  "Docker":     <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>,
  "AWS":        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#FF9900"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 011.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 00-.735-.136 6.02 6.02 0 00-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 01-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 01.32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 01.311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 01-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.521.521 0 01-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 01-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 00.41-.758.777.777 0 00-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 01-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 01.24.2.43.43 0 01.071.263v.375c0 .168-.064.256-.184.256a.83.83 0 01-.303-.096 3.652 3.652 0 00-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/></svg>,
  "Vercel":     <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M24 22.525H0l12-21.05z"/></svg>,
  "CI/CD":      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>,
  "Network Security": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  "Ethical Hacking": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M9 7l2 2-2 2M13 11h3"/></svg>,
  "Vulnerability Scan": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v3M11 14h.01"/></svg>,
  "Penetration Testing": <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H3m6 0h6m-6 0v7m6-7v7m0-7h6"/></svg>,
};

/* ─── Pill (static, no animation) ─── */
function Pill({ label, color }: { label: string; color: string }) {
  const icon = techSVGs[label];
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{
        background: "var(--skills-card-pill-bg, rgba(255,255,255,0.07))",
        border: "1px solid var(--skills-card-pill-border, rgba(255,255,255,0.1))",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3)",
        color: "var(--skills-card-pill-text, #ffffff)",
        fontFamily: "var(--font-space-grotesk)",
        letterSpacing: "0.01em",
      }}
    >
      {icon || <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />}
      {label}
    </span>
  );
}

/* ─── Static pills — always visible, no framer-motion, no flicker ─── */
function StaticPills({ techs }: { techs: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((t) => <Pill key={t.label} {...t} />)}
    </div>
  );
}

/* ─── Animated pills — reveal on hover only ─── */
function HoverPills({ techs, hovered }: { techs: { label: string; color: string }[]; hovered: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techs.map((t, i) => (
        <motion.span
          key={t.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.28, delay: hovered ? i * 0.045 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            background: "var(--skills-card-pill-bg, rgba(255,255,255,0.07))",
            border: "1px solid var(--skills-card-pill-border, rgba(255,255,255,0.1))",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3)",
            color: "var(--skills-card-pill-text, #ffffff)",
            fontFamily: "var(--font-space-grotesk)",
            letterSpacing: "0.01em",
          }}
        >
          {techSVGs[t.label] || <span className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} />}
          {t.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Inner pill box — uses liquid glass ─── */
function PillBox({ children }: { children: React.ReactNode }) {
  return (
    <LiquidGlassBox className="p-4">
      {children}
    </LiquidGlassBox>
  );
}

/* ─── Section ─── */
export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardBlur = (id: number): React.CSSProperties => {
    if (hoveredCard === null) return {};
    return {
      transition: "filter 0.4s ease, opacity 0.4s ease",
      filter: hoveredCard !== id ? "blur(4px) saturate(0.4)" : "none",
      opacity: hoveredCard !== id ? 0.35 : 1,
    };
  };

  return (
    <section id="skills" ref={ref} className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-12">
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span className="font-bold italic"
              style={{ fontFamily: "var(--font-dancing-script), cursive", fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-text-1)" }}>
              My Skills
            </span>
            <span className="font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)", color: "var(--color-accent-purple)" }}>
              Technologies &amp; Tools
            </span>
          </h2>
          <div className="h-px w-20" style={{ background: "linear-gradient(90deg, var(--color-accent-purple), transparent)" }} />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Card 1: Cybersecurity ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={cardBlur(1)}
            className="lg:row-span-2 lg:col-start-1 lg:row-start-1 flex"
          >
            <SpotlightCard
              spotlightColor="rgba(16,185,129,0.12)"
              className="bento-card relative overflow-hidden rounded-2xl cursor-pointer flex flex-col justify-between min-h-[300px] lg:min-h-[440px] w-full transition-all duration-300"
              style={{
                background: "var(--skills-card-bg-cyber, linear-gradient(160deg, #0d1117 0%, #0a1628 60%, #071020 100%))",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: hoveredCard === 1 ? "rgba(16,185,129,0.5)" : "var(--skills-card-border, rgba(255,255,255,0.08))",
                boxShadow: hoveredCard === 1 ? "0 0 40px rgba(16,185,129,0.15), 0 16px 48px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.4)",
              } as React.CSSProperties}
            >
              {/* Video bg */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <video src="/cyber.mp4" autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  style={{
                    opacity: "var(--skills-card-video-opacity, 0.3)",
                    filter: "saturate(0.7) brightness(0.6)"
                  }} />
                <div className="absolute inset-0 transition-all duration-300"
                  style={{ background: "var(--skills-card-video-overlay, linear-gradient(160deg, rgba(13,17,23,0.45) 0%, rgba(10,22,40,0.35) 50%, rgba(7,16,32,0.55) 100%))" }} />
              </div>

              <div className="relative z-10 p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
                  style={{ color: "#10B981", fontFamily: "var(--font-inter-tight)" }}>
                  Core Expertise
                </p>
                <h3 className="font-black leading-[0.95]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "var(--skills-card-text-1, #ffffff)", fontFamily: "var(--font-space-grotesk)" }}>
                  Cyber
                </h3>
                <h3 className="font-black leading-[0.95]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "#10B981", fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 40px rgba(16,185,129,0.6)" }}>
                  Security
                </h3>
              </div>

              <div className="relative z-10 p-7 pt-0">
                {/* PillBox hidden by default, revealed on hover */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredCard === 1 ? 1 : 0, y: hoveredCard === 1 ? 0 : 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PillBox>
                    <HoverPills techs={securityTech} hovered={hoveredCard === 1} />
                  </PillBox>
                </motion.div>
                <motion.div
                  animate={{ opacity: hoveredCard === 1 ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--skills-card-text-3, rgba(255,255,255,0.25))", fontFamily: "var(--font-inter-tight)" }}
                >
                  <Lock size={11} />
                  Hover to explore
                </motion.div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Card 2: Frontend ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={cardBlur(2)}
            className="lg:col-start-2 lg:row-start-1 flex"
          >
            <SpotlightCard
              spotlightColor="rgba(97,218,251,0.12)"
              className="bento-card relative overflow-hidden rounded-2xl cursor-pointer w-full flex flex-col justify-between transition-all duration-300"
              style={{
                background: "var(--skills-card-bg-standard, #0d1117)",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: hoveredCard === 2 ? "rgba(97,218,251,0.4)" : "var(--skills-card-border, rgba(255,255,255,0.08))",
                boxShadow: hoveredCard === 2 ? "0 0 32px rgba(97,218,251,0.1), 0 16px 48px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.4)",
              } as React.CSSProperties}
            >
              <div className="p-7 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
                  style={{ color: "var(--skills-card-text-3, rgba(255,255,255,0.3))", fontFamily: "var(--font-inter-tight)" }}>
                  Web · Mobile · Systems
                </p>
                <h3 className="font-bold mb-4 leading-none whitespace-nowrap"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "var(--skills-card-text-1, #ffffff)", fontFamily: "var(--font-space-grotesk)" }}>
                  Frontend &amp; Frameworks
                </h3>
                <PillBox><StaticPills techs={frontendTech} /></PillBox>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Card 4: DevOps ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            style={cardBlur(4)}
            className="lg:col-start-2 lg:row-start-2 flex"
          >
            <SpotlightCard
              spotlightColor="rgba(255,153,0,0.12)"
              className="bento-card relative overflow-hidden rounded-2xl cursor-pointer w-full flex flex-col justify-between transition-all duration-300"
              style={{
                background: "var(--skills-card-bg-standard, #0d1117)",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: hoveredCard === 4 ? "rgba(255,153,0,0.4)" : "var(--skills-card-border, rgba(255,255,255,0.08))",
                boxShadow: hoveredCard === 4 ? "0 0 32px rgba(255,153,0,0.1), 0 16px 48px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.4)",
              } as React.CSSProperties}
            >
              <div className="p-7 w-full">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
                  style={{ color: "var(--skills-card-text-3, rgba(255,255,255,0.3))", fontFamily: "var(--font-inter-tight)" }}>
                  CI/CD · Containers · Infrastructure
                </p>
                <h3 className="font-bold mb-4 leading-none whitespace-nowrap"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "var(--skills-card-text-1, #ffffff)", fontFamily: "var(--font-space-grotesk)" }}>
                  DevOps &amp; Cloud
                </h3>
                <PillBox><StaticPills techs={devopsTech} /></PillBox>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Card 3: Backend ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            style={cardBlur(3)}
            className="lg:row-span-2 lg:col-start-3 lg:row-start-1 flex"
          >
            <SpotlightCard
              spotlightColor="rgba(139,92,246,0.12)"
              className="bento-card relative overflow-hidden rounded-2xl cursor-pointer flex flex-col justify-between min-h-[300px] lg:min-h-[440px] w-full transition-all duration-300"
              style={{
                background: "var(--skills-card-bg-backend, linear-gradient(135deg, #0d1117 0%, #1a0a2e 50%, #0d1117 100%))",
                borderWidth: "1px", borderStyle: "solid",
                borderColor: hoveredCard === 3 ? "rgba(139,92,246,0.5)" : "var(--skills-card-border, rgba(255,255,255,0.08))",
                boxShadow: hoveredCard === 3 ? "0 0 40px rgba(139,92,246,0.15), 0 16px 48px rgba(0,0,0,0.6)" : "0 8px 32px rgba(0,0,0,0.4)",
              } as React.CSSProperties}
            >
              {/* Video bg */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <video src="/bapi.mp4" autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                  style={{
                    opacity: hoveredCard === 3 ? "var(--skills-card-video-opacity-hover, 0.55)" : "var(--skills-card-video-opacity, 0.25)",
                    filter: "brightness(0.7) saturate(0.8)"
                  }} />
                <div className="absolute inset-0 transition-all duration-300"
                  style={{ background: hoveredCard === 3
                    ? "var(--skills-card-video-overlay-hover, linear-gradient(160deg, rgba(13,10,30,0.3) 0%, rgba(26,10,46,0.2) 100%))"
                    : "var(--skills-card-video-overlay, linear-gradient(160deg, rgba(13,10,30,0.65) 0%, rgba(26,10,46,0.55) 100%))" }} />
              </div>

              <div className="relative z-10 p-7 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-2"
                  style={{ color: "var(--skills-card-text-3, rgba(255,255,255,0.5))", fontFamily: "var(--font-inter-tight)" }}>
                  Databases · Auth · Real-Time
                </p>
                <h3 className="font-bold mb-4 leading-none whitespace-nowrap"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "var(--skills-card-text-1, #ffffff)", fontFamily: "var(--font-space-grotesk)" }}>
                  Backend &amp; APIs
                </h3>
                
                {/* PillBox hidden by default, revealed on hover */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredCard === 3 ? 1 : 0, y: hoveredCard === 3 ? 0 : 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PillBox>
                    <HoverPills techs={backendTech} hovered={hoveredCard === 3} />
                  </PillBox>
                </motion.div>
              </div>

              <div className="relative z-10 px-7 pb-6">
                <motion.div
                  animate={{ opacity: hoveredCard === 3 ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--skills-card-text-3, rgba(255,255,255,0.25))", fontFamily: "var(--font-inter-tight)" }}
                >
                  <Server size={11} />
                  Hover to explore
                </motion.div>
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
