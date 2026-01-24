'use client';

import React, { useEffect, useState } from 'react';
import { AES, enc } from 'crypto-js';
import "./testModeue.css"
import Feature13 from '@/src/section/feature13/feature13';

const decryptMessage = (encryptedMessage: string): any => {
  try {
    const env = process.env.NEXT_PUBLIC_ENG_ENV;
    if (env === 'production') {
      const bytes = AES.decrypt(encryptedMessage, '$207@OnQL7L');
      const decrypted = bytes.toString(enc.Utf8);
      return JSON.parse(decrypted);
    }
    return encryptedMessage;
  } catch (err) {
    console.error('UNABLE TO DECIPHER', err);
    return null;
  }
};

const Page: React.FC = () => {
  const [decryptedData, setDecryptedData] = useState<any>(null);

  useEffect(() => {
    // Set env manually for client testing
    (process.env.NEXT_PUBLIC_ENG_ENV as string) = 'production';

    const encrypted =  "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"



;
    const result = decryptMessage(encrypted);
    setDecryptedData(result);
  }, []);

  return (
    <>
      {/* <h2>Decrypted Output:</h2>
      {decryptedData ? (
        <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
      ) : (
        <p>No data or decryption failed.</p>
      )} */}
      {/* <div className="loader"></div> */}
      <Feature13/>
    </>
  );
};

export default Page;






