import { useState } from "react";
import Image from "next/image";
import { Heading1 } from "@/styles/texts";

export default function Step_2_1() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <Image
        src="/images/vb_step_2.svg"
        alt="signup step2"
        width={368}
        height={48}
        style={{ margin: "48px 0 48px 0" }}
      />
      <Heading1 style={{ margin: "16px 0 40px 0" }}>
        Compare plans to find
        <br />
        what fits best for your needs.
      </Heading1>
      <Image
        src="/images/vb_Individual_inactive.svg"
        alt="individual"
        width={721}
        height={112}
        style={{ cursor: "pointer" }}
      />
      {isClicked ? (
        <Image
          src="/images/vb_Business_active.svg"
          alt="business"
          width={721}
          height={112}
          onClick={() => setIsClicked(false)}
          style={{ margin: "16px 0 56px 0", cursor: "pointer" }}
        />
      ) : (
        <Image
          src="/images/vb_Business_inactive.svg"
          alt="business"
          width={721}
          height={112}
          onClick={() => setIsClicked(true)}
          style={{ margin: "16px 0 56px 0", cursor: "pointer" }}
        />
      )}
    </>
  );
}
