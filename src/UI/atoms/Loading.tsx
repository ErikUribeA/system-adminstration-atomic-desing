'use client'

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
`

const SpinnerContainer = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`

const SpinnerRing = styled.div<{ delay: number; opacity: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #FF69B4;
  border-radius: 50%;
  animation: ${spin} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  opacity: ${props => props.opacity};
`

export default function Loading() {
    return (
        <LoaderWrapper>
            <SpinnerContainer>
                {[0, 1, 2].map((i) => (
                    <SpinnerRing key={i} delay={i * 0.1} opacity={1 - i * 0.2} />
                ))}
            </SpinnerContainer>
        </LoaderWrapper>
    )
}