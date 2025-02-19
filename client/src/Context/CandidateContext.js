import React, { createContext, useState } from "react";

const CandidateContext = createContext();

const CandidateProvider = ({ children }) => {
  const [candidateId, setCandidateId] = useState(null);
  const [candidateEmail, setCandidateEmail] = useState(null);

  return (
    <CandidateContext.Provider
      value={{ candidateId, setCandidateId, candidateEmail, setCandidateEmail }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export { CandidateContext, CandidateProvider };
