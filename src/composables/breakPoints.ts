import { onMounted, reactive, ref, watch } from 'vue'

export const useBreakPoints = () => {
  const width = ref<number>(window.innerWidth)
  const breakPoint = reactive({
    sm: false,
    md: false,
    lg: false,
    xl: false
  })
  const breakPointCalc = (width: number) => {
    breakPoint.sm = width < 640
    breakPoint.md = width >= 640 && width < 768
    breakPoint.lg = width >= 768 && width < 1024
    breakPoint.xl = width >= 1024
  }

  watch(width, (value) => {
    breakPointCalc(value)
  })

  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })

  onMounted(() => {
    breakPointCalc(width.value)
  })
  return { breakPoint, width }
}