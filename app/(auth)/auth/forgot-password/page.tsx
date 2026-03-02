import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Image from "next/image";

/**
 * Forgot Password Page - Email Link Flow
 * 
 * This page provides password recovery using email links (standard flow).
 * 
 * Flow:
 * 1. User enters email
 * 2. Receives email with reset link
 * 3. Clicks link → redirects to /auth/update-password
 * 4. Sets new password
 * 
 * Difference from /auth/recover:
 * - forgot-password: Uses email link reset (click link in email → redirects to update-password page)
 * - recover: Uses OTP code flow (receive code → enter code → set password on same page)
 * 
 * Both methods are valid - users can choose their preferred recovery method.
 */
export default function Page() {
  return (
    <div className='bg-white flex grow w-full max-w-[70rem] sm:min-h-[40rem] rounded-lg shadow-md flex-col sm:flex-row overflow-clip relative'>
    <div role='left-side' className='bg-emerald-900 flex sm:w-3/5 py-4 sm:py-0 items-center justify-center relative overlay-clip min-h-[200px] sm:min-h-0'>
      <Image src='/background_login.png' alt='Foto-Regiao-Vulcanica' fill className="object-cover selection-none pointer-events-none opacity-20"></Image>
      <div className="wrapper max-w-[30rem] text-center flex flex-col items-center justify-center text-white z-50">
        <div className="image-box h-32 w-48 sm:h-40 sm:w-60 relative">
          <Image src='/logo.png' alt='Foto-Regiao-Vulcanica' fill className="selection-none object-contain pointer-events-none"></Image>
        </div>
      </div>
    </div>
    <div role='right-side' className='flex items-center sm:w-2/5 justify-center px-4 sm:px-2 py-5 w-full'>
     <ForgotPasswordForm />
    </div>
    </div>
  );
}
