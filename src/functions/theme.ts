export function theme(themeName: string) {
    localStorage.setItem("theme", themeName)
    resetTheme()
}

export function resetTheme() {
    const theme = localStorage.getItem("theme")

    let stylesheetsAll = document.head.getElementsByClassName('stylesheet')
    let stylesheetsTheme = document.head.getElementsByClassName('stylesheet ' + theme)

    for (let i = stylesheetsAll.length-1; i >= 0; i--) {
        stylesheetsAll.item(i)!.setAttribute("disabled", "disabled")
    }

    for (let i = stylesheetsTheme.length-1; i >= 0; i--) {
        stylesheetsTheme.item(i)!.removeAttribute("disabled")
    }
}