msgbox WScript.Arguments(0) & "さんへメール送信"

'変数を宣言し、引数（メアド）を取得する
' Dim args: args = "pxbdg597@ybb.ne.jp"
' Dim args: args = WScript.Arguments(0)
' Dim status: status = 0

' 'エラー発生時に処理を継続
' On Error Resume Next

' ' WScript.Echo("ネットワーク プリンタ割り当て :");

'引数確認
' msgbox args & "さんへメール送信"

' msgbox "Hello, World!!!!!!!!!"

' 'Outlookオブジェクトを用意
' Set appOutlook = CreateObject("Outlook.Application")
' Set objMailItem = appOutlook.CreateItem(olMailItem)

' with objMailItem
' 	.Recipients.Add args
' 	.Subject = "これはテストメールですよ"
' 	.Body = "メールの本文です。"
' 	'.Attachments.Add "c:test.csv"
' 	.Send
' end with

' On Error Goto 0

' '終了処理
' set appOutlook = nothing
' set objMailItem = nothing

' 'ステータスを返す
' WScript.Quit status
