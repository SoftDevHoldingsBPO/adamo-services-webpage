import type { User } from "./types";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Carlos Eduardo Morales",
    email: "carlos.morales@example.com",
    serviceRole: "Pay (Preparador), ID (Administrador, Comp...",
    status: "active",
    services: {
      pay: { enabled: true, role: "preparer" },
      id: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "María Fernanda López",
    email: "maria.lopez@example.com",
    serviceRole: "Sign (Administrador)",
    status: "active",
    services: {
      sign: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "3",
    name: "José Antonio Rivera",
    email: "jose.rivera@example.com",
    serviceRole: "Risk (Administrador, Auditor)",
    status: "active",
    services: {
      risk: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "4",
    name: "Ana Sofía Martínez",
    email: "ana.martinez@example.com",
    serviceRole: "ID (Compliance), Pay (Administrador)",
    status: "active",
    services: {
      id: { enabled: true, role: "compliance" },
      pay: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-04-18"),
  },
  {
    id: "5",
    name: "Luis Alberto Gómez",
    email: "luis.gomez@example.com",
    serviceRole: "Sign (Administrador, Preparador)",
    status: "active",
    services: {
      sign: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-05-22"),
  },
  {
    id: "6",
    name: "Isabel Cristina Herrera",
    email: "isabel.herrera@example.com",
    serviceRole: "Pay (Administrador), Check (Administrador)",
    status: "active",
    services: {
      pay: { enabled: true, role: "admin" },
      check: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-06-07"),
  },
  {
    id: "7",
    name: "Miguel Ángel Torres",
    email: "miguel.torres@example.com",
    serviceRole: "Check (Administrador)",
    status: "active",
    services: {
      check: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-07-30"),
  },
  {
    id: "8",
    name: "Laura Beatriz Sánchez",
    email: "laura.sanchez@example.com",
    serviceRole: "Check (Administrador, Supervisor), Sign (Pr...",
    status: "active",
    services: {
      check: { enabled: true, role: "admin" },
      sign: { enabled: true, role: "preparer" },
    },
    createdAt: new Date("2024-08-11"),
  },
  {
    id: "9",
    name: "Juan Manuel Díaz",
    email: "juan.diaz@example.com",
    serviceRole: "Risk (Administrador, Auditor)",
    status: "disabled",
    services: {
      risk: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-09-03"),
  },
  {
    id: "10",
    name: "Patricia Elena Cruz",
    email: "patricia.cruz@example.com",
    serviceRole: "ID (Compliance), Pay (Administrador)",
    status: "disabled",
    services: {
      id: { enabled: true, role: "compliance" },
      pay: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-10-19"),
  },
  {
    id: "11",
    name: "Ricardo José Fernández",
    email: "ricardo.fernandez@example.com",
    serviceRole: "ID (Compliance), Pay (Administrador)",
    status: "active",
    services: {
      id: { enabled: true, role: "compliance" },
      pay: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-11-25"),
  },
  {
    id: "12",
    name: "Sofía Valentina Rojas",
    email: "sofia.rojas@example.com",
    serviceRole: "Risk (Administrador, Auditor)",
    status: "active",
    services: {
      risk: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2024-12-08"),
  },
  {
    id: "13",
    name: "Diego Alejandro Castillo",
    email: "diego.castillo@example.com",
    serviceRole: "Sign (Administrador, Preparador)",
    status: "disabled",
    services: {
      sign: { enabled: true, role: "admin" },
    },
    createdAt: new Date("2025-01-02"),
  },
];
