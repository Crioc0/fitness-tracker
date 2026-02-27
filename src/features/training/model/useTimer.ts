import { ref } from 'vue';

export function useTimer(onFinish: () => void) {
  const remaining = ref(0);

  let endTime = 0;
  let rafId: number | null = null;
  // let pausedAt: number | null = null

  function start(seconds: number) {
    stop();

    const now = Date.now();
    endTime = now + seconds * 1000;
    tick();
  }

  function tick() {
    const now = Date.now();
    const diff = endTime - now;

    remaining.value = Math.max(0, Math.ceil(diff / 1000));

    if (diff <= 0) {
      stop();
      onFinish()
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      navigator.vibrate(200);
      rafId = null;
    }
  }

  // function pauseTimer() {
  //   if (!rafId) return
  //
  //   pausedAt = Date.now()
  //   stop(
  // }
  //
  // function resumeTimer() {
  //   if (!pausedAt) return
  //
  //   const pauseDuration = Date.now() - pausedAt
  //   endTime += pauseDuration
  //
  //   pausedAt = null
  //   tick()
  // }

  return {
    start, remaining,stop
  }
}
