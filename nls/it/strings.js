/**
 * =====================
 * BEFORE YOU START
 * =====================
 * There are some placeholders available to use, you can see examples below
 * Try to avoid unescaped ' and " symbols
 * Sometimes you may need to use HTML in text.
 * If some special characters are displayed incorrectly - contact developer, send string's name and your text.
 * Sometimes you may need to escape the escape character itself (see "eqftp__cs__c_localpath__explorer_title") to avoid bugs
 * Please, test features that you translate to see if everything keeps working fine
 * 
 * Here's Google's guide on writing style, please check it before you go futher: https://material.io/guidelines/style/writing.html
 */
define({
 "eqftp__toolbar__title" : "Apri eqFTP",

 "eqftp__context__upload": "Carica",
 
 /**
 * WELCOME SCREEN
 */
 "eqftp__wlcm__welcome_headline": "Benvenuto",
 "eqftp__wlcm__welcome_text": "Non è stato trovato il tuo file delle impostazioni<br/>Individualo o creare uno nuovo",
 "eqftp__wlcm__welcome_button_locate": "Individua",
 "eqftp__wlcm__welcome_button_create": "Crea",
 "eqftp__wlcm__welcome_saveFile_title": "Salva file impostazioni",
 
 /**
 * PASSWORD WINDOW
 */
 "eqftp__paswd__window_title": "Decifra impostazioni",
 "eqftp__paswd__input_label": "Password principale",
 "eqftp__paswd__input_placeholder": "Tua password",
 "eqftp__paswd__button": "Decifra",
 
 /**
 * CONNECTION'S SETTINGS WINDOW
 */
 "eqftp__cs__window_title_edit": "Modifica connessione",
 "eqftp__cs__window_title_new": "Crea connessione",
 "eqftp__cs__basic_settings": "Impostazioni base",
 "eqftp__cs__additional_settings": "Impostazioni aggiuntive",
 "eqftp__cs__c_name": "Nome connessione",
 "eqftp__cs__c_protocol": "Protocollo",
 "eqftp__cs__c_server": "Indirizzo IP o nome dominio",
 "eqftp__cs__c_port": "Porta",
 "eqftp__cs__c_login": "Accesso",
 "eqftp__cs__c_password": "Password",
 "eqftp__cs__c_localpath": "Cartella locale",
 "eqftp__cs__c_localpath__explorer_title": "Scegli la cartella per i file del progetto",
 "eqftp__cs__c_rsa": "Cartella della chiave RSA",
 "eqftp__cs__c_rsa__explorer_title": "Seleziona la tua chiave RSA",
 "eqftp__cs__c_remotepath": "Cartella remota",
 "eqftp__cs__c_check_difference": "Controlla le diffenze tra i file",
 "eqftp__cs__c_autoupload": "Carica automaticamente le modifiche",
 "eqftp__cs__c_ignore_list": "Lista ignorati",
 "eqftp__cs__c_ignore_list_placeholder": "Utilizza la sintassi di .gitignore",
 
 /**
 * GENERAL SETTINGS
 */
 "eqftp__gs__setting_file_label": "File impostazioni",
 "eqftp__gs__setting_file_placeholder": "Cartella del file impostazioni",
 "eqftp__gs__encrypt_label": "Crittografare le impostazioni",
 "eqftp__gs__master_password_label": "Password principale",
 "eqftp__gs__master_password_placeholder": "Lascia vuoto per tenere quella attuale",
 "eqftp__gs__folder_for_projects_label": "Cartella dei progetti",
 "eqftp__gs__folder_for_projects_placeholder": "Percorso della cartella",
 "eqftp__gs__folder_for_projects_explorer_title": "Scegli la cartella in cui memorizzare i file scaricati",
 "eqftp__gs__timestamp_format_label": "Formato timestamp",
 "eqftp__gs__timestamp_format_placeholder": "Formato timestamp preferito",
 "eqftp__gs__open_project_connection_label": "Apri progetto locale alla connessione",
 "eqftp__gs__debug_label": "Debug",
 
 /**
 * TABS
 */
 "eqftp__tab__fileTree__title": "Lista file",
 "eqftp__tab__queue__title": "Coda",
 "eqftp__tab__connections__title": "Connessioni",
 "eqftp__tab__settings__title": "Impostazioni",
 
 /**
 * DIALOGS
 */
 "eqftp__dialog__connection_removing_title": "Rimuovere {{name}}?",
 "eqftp__dialog__connection_removing_text": "Questa azione non può essere annullata",
 
 "eqftp__dialog__connection_editing_unsaved_title": "Dimenticare le modifiche non salvate?",
 "eqftp__dialog__connection_editing_unsaved_text": "Tutte le modifiche sarranno perse",
 
 "eqftp__dialog__fileTree_delete_title": "Eliminare {{filename}}?",
 "eqftp__dialog__fileTree_delete_text": "Questa azione non può essere annullata",
 "eqftp__dialog__fileTree_delete_local": "Elimina file locale",
 
 /**
 * LOGS
 */
 "eqftp__log__download_success": "File {{filename}} scaricato",
 "eqftp__log__download_error": "Si è verificato un errore scaricando {{filename}}: {{err}}",
 "eqftp__log__delete_success": "File {{filename}} eliminato",
 "eqftp__log__delete_error": "Si è verificato un errore eliminando {{filename}}: {{err}}",
 "eqftp__log__upload_success": "File {{filename}} caricato",
 "eqftp__log__upload_error": "Si è verificato un errore caricando {{filename}}: {{err}}",
 
 "eqftp__log__connection_ready": "Connessine {{name}} aperta",
 "eqftp__log__connection_error": "Si è verificato un errore durante la connessione a {{name}}: {{error}}",
 "eqftp__log__connection_close": "Connessione {{name}} chiusa",
 "eqftp__log__connection_tmp_error": "Impossibile creare connessione temporanea: {{error}}",
 
 "eqftp__log__settings_load_success": "File impostazioni {{filename}} caricato",
 "eqftp__log__settings_load_error": "Si è verificato un errore caricando il file impostazioni {{filename}}",
 "eqftp__log__settings_load__dialog_error": "Si è verificato un errore aprendo il file: {{err}}",
 "eqftp__log__settings_save_success": "Impostazioni salvate in {{filename}}",
 "eqftp__log__settings_save_error": "Si è verificato un errore salvando le impostazioni in {{filename}}",
 
 "eqftp__log__settings_connection_save_success": "Connessione {{name}} salvata",
 "eqftp__log__settings_connection_save_error": "Si è verificato un errore salvando la connessione: {{{err}}}",
 
 /**
  * TOASTS
  * _m means multiple. You can use {{num}} to display stacked amount
  */
 "eqftp__toast__download_success": "File {{filename}} scaricato",
 "eqftp__toast__download_success_m": "File scaricati ({{num}})",
 "eqftp__toast__download_error": "Impossibile scaricare {{filename}}",
 "eqftp__toast__download_error_m": "Impossibile scaricare i file ({{num}})",
 
 "eqftp__toast__delete_success": "File {{filename}} eliminato",
 "eqftp__toast__delete_success_m": "File eliminati ({{num}})",
 "eqftp__toast__delete_error": "Impossibile eliminare {{filename}}",
 "eqftp__toast__delete_error_m": "Impossibile eliminare i file ({{num}})",
    
 "eqftp__toast__upload_success": "File {{filename}} caricato",
 "eqftp__toast__upload_success_m": "File caricati ({{num}})",
 "eqftp__toast__upload_error": "Impossibile caricare {{filename}}",
 "eqftp__toast__upload_error_m": "Impossibile caricare i file ({{num}})",
 
 "eqftp__toast__connection_error": "Si è verificato un errore durante la connessione a {{name}}",
 "eqftp__toast__files_difference": "Il file {{filename}} è diverso dalla copia remota",
 
 "eqftp__toast__file_created_locally": "Creare lo stesso file sul server?",
 "eqftp__toast__file_created_remotely": "Creare lo stesso file sul PC",
 "eqftp__toast__file_renamed_locally": "Rinominare lo stesso file sul server?",
 "eqftp__toast__file_renamed_remotely": "Rinominare lo stesso file sul PC?",
 "eqftp__toast__file_removed_locally": "Rimuovere lo stesso file sul server?",
 "eqftp__toast__file_removed_remotely": "Rimuovere lo stesso file sul PC?",
 
 /**
  * CONTEXT MENUS
  */
 "eqftp__context__connectionElement__connect": "Connetti",
 "eqftp__context__connectionElement__remove": "Rimuovi",
 "eqftp__context__connectionElement__edit": "Modifica",
 
 "eqftp__context__fileTreeElement__download_open": "Scarica e apri",
 "eqftp__context__fileTreeElement__download": "Scarica",
 "eqftp__context__fileTreeElement__delete": "Elimina",
 "eqftp__context__fileTreeElement__refresh": "Aggiorna",
 "eqftp__context__fileTreeElement__open": "Apri",
 
 "eqftp__context__queueElement__restart": "Riavvia",
 "eqftp__context__queueElement__remove": "Rimuovi",
 
 /**
 * CONTROLS
 * Check this page if you have any questions about this part: https://material.io/guidelines/style/writing.html#writing-language
 * There's a table called "Text for buttons and related elements"
 */
 "eqftp__controls__cancel": "Cancella",
 "eqftp__controls__nothanks": "No grazie",
 "eqftp__controls__dismiss": "Dimentica",
 "eqftp__controls__back": "Indietro",
 
 "eqftp__controls__gotit": "Capito",
 "eqftp__controls__ok": "OK",
 "eqftp__controls__done": "Fatto",
 
 "eqftp__controls__learnmore": "Per saperne di più",
 
 // Next strings are custom but translate them just like previous
 "eqftp__controls__save": "Salva",
 "eqftp__controls__delete": "Rimuovi",
 "eqftp__controls__showlog": "Mostra log",
 "eqftp__controls__resolve": "Risolvi",
 "eqftp__controls__create": "Crea",
 "eqftp__controls__rename": "Rinomina",
 
 /**
  * TOOLTIPS
  */
 "eqftp__tooltip__settings_editor__localpath_autocomplete": "Cartella del progetto attuale",
 
 /**
 * FILESIZES
 */
 "eqftp__filesize_bytes": "byte",
 "eqftp__filesize_kilobytes": "kb",
 "eqftp__filesize_megabytes": "mb",
 "eqftp__filesize_gigabytes": "gb",
 "eqftp__filesize_terabytes": "tb",
 "eqftp__filesize_petabytes": "pt",
 "eqftp__filesize_exabytes": "eb",
 "eqftp__filesize_zettabytes": "zb",
 "eqftp__filesize_yottabytes": "yb",
 
 /**
 * ERRORS
 */
 "eqftp__ERR__NOSERVERSET": "Il parametro \"Server\" è vuoto",
 
 /**
  * MISC
  */
 // {{{names}}} must have 3x{} and will contain "Equals182 & GoliafRS" string
 "eqftp__misc__credits_text": "eqFTP è gestito da {{{names}}}",
 // {{{button}}} must have 3x{} and will contain text from "eqftp__misc__donate_button"
 "eqftp__misc__donate_text": "{{{button}}} per supportare questo progetto!",
 "eqftp__misc__donate_button": "Dona",
 "eqftp__misc__new_fileTree_element": "Senza titolo",

 "eqftp_dummy" : "dummy" // Not used anywhere, just leave it.
});