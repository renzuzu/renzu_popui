# renzu_popui
POPUP UI to Send Events instead of using while loop controlpressed - FIVEM [WIP]
- DEMO image
- ![alt text](https://i.imgur.com/y8kyg09.png)

- SAMPLE USAGE
``` 
local table = {
        ['event'] = 'opengarage',
        ['title'] = 'Garage A',
        ['server_event'] = false,
        ['unpack_arg'] = false,
        ['invehicle_title'] = 'Store Vehicle',
        ['confirm'] = '[ENTER]',
        ['reject'] = '[CLOSE]',
        ['custom_arg'] = {}, -- example: {1,2,3,4}
        ['use_cursor'] = false, -- USE MOUSE CURSOR INSTEAD OF INPUT (ENTER)
    }
    TriggerEvent('renzu_popui:showui',table)`

    - Close UI
    
    `TriggerEvent('renzu_popui:closeui')
    ```
