'�ϐ���錾���A�����i���A�h�j���擾����
Dim args: args = WScript.Arguments(0)
dim status: status = 0

'�G���[�������ɏ������p��
On Error Resume Next

'�����m�F
msgbox args & "����փ��[�����M"

'Outlook�I�u�W�F�N�g��p��
Set appOutlook = CreateObject("Outlook.Application")
Set objMailItem = appOutlook.CreateItem(olMailItem)

with objMailItem
	.Recipients.Add args
	.Subject = "����̓e�X�g���[���ł���"
	.Body = "���[���̖{���ł��B"
	'.Attachments.Add "c:test.csv"
	.Send
end with

On Error Goto 0

'�I������
set appOutlook = nothing
set objMailItem = nothing

'�X�e�[�^�X��Ԃ�
WScript.Quit status
