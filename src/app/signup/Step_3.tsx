import { ReactElement, useState } from "react";
import Image from "next/image";
import { Heading1 } from "@/styles/texts";
import { styled } from "styled-components";
import colors from "@/styles/color";

export default function Step_3() {
  return (
    <>
      <Image
        src="/images/vb_step_3.svg"
        alt="signup step3"
        width={352}
        height={48}
        style={{ margin: "48px 0 64px 0" }}
      />
      <Image
        src="/images/vb_coverage_agreement.svg"
        alt="coverage agreement"
        width={721}
        height={1197}
        style={{ marginBottom: "54px" }}
      />
    </>
  );
}
