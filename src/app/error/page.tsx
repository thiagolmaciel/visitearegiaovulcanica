'use client'
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");
  return (
    <div>
      <p>Ops! Algo deu errado.</p>
      <p>{msg}</p>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ErrorContent />
    </Suspense>
  );
};

export default ErrorPage;
