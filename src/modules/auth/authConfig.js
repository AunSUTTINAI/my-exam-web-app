export const LoginConfig = [
  { id: "email", label: "Email", type: "email", required: true },
  { id: "password", label: "Password", type: "password", required: true },
];

export const RegisterConfig = [
  { id: "email", label: "Email", type: "email", required: true },
  { id: "password", label: "Password", type: "password", required: true },
  { id: "firstName", label: "First name", type: "text", required: true },
  { id: "lastName", label: "Last name", type: "text", required: true },
  { id: "organization", label: "Organization", type: "text", required: true },
  { id: "address", label: "Address", type: "text", required: true },
  { id: "tambon", label: "Tambon", type: "text", required: true },
  { id: "amphoe", label: "Amphoe", type: "text", required: true },
  { id: "province", label: "Province", type: "select", required: true },
  { id: "zipcode", label: "Zip code", type: "text", required: true },
  { id: "country", label: "Country", type: "text", required: true },
  { id: "phone", label: "Phone", type: "tel", required: true },
];
