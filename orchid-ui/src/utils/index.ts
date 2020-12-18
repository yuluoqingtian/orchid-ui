// 渲染一定数量的空格
export function renderBlank(num: number): string {
    let blank: string = '';
    for (let i = 0; i < num; i++) {
        blank += '\u00a0'
    }
    return blank
}