//这段代码是用来进行Vue性能测试的。如果当前环境不是'production'，首先它会检查是否处于浏览器环境，并且window.performance是否可用。然后，它进一步检查window.performance对象是否具有mark、measure、clearMarks和clearMeasures方法。如果都满足，它会定义两个新的函数mark和measure，这两个函数分别调用了window.performance.mark和window.performance.measure方法来记录性能指标。在measure函数中，它还调用了window.performance.clearMarks方法来清除之前设置的startTag和endTag标记。最后，这两个函数将被用于测量Vue的性能。如果这些条件不满足，则不会定义这两个函数，因此Vue将无法进行性能测试。/* istanbul ignore if */ 注释表示这段代码是为了性能测试而添加的，将被忽略测试覆盖率统计。
import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance 
  //window.performance是浏览器提供的一个API，它提供了一些方法来测量和分析网页性能，
  //包括测量时间间隔、页面加载时间、资源下载时间等。
  //这些方法包括performance.mark、performance.measure、performance.now、performance.getEntries等。
  //这些方法的使用可以帮助开发者了解网页性能问题，并进行优化。
  //通常，开发者可以使用performance API来衡量和优化网站的性能，以提高用户的访问体验。
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}