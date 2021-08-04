# renzu_popui
POPUP UI to Fire Events instead of using while loop controlpressed - FIVEM (0.00 ms idle or active)

# Methods
# POPUI
- DEMO
- ![image](https://user-images.githubusercontent.com/82306584/128152418-cf190597-4438-4860-8d63-d49874a763ef.png)

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
                ['fa'] = '<i class="fad fa-gas-pump"></i>',
                ['custom_arg'] = {}, -- example: {1,2,3,4}
                ['use_cursor'] = false, -- USE MOUSE CURSOR INSTEAD OF INPUT (ENTER)
        }
        
        TriggerEvent('renzu_popui:showui',table)`

            - Close UI
    
        TriggerEvent('renzu_popui:closeui')
    
 ```

# DrawTEXTUI

- DEMO
![image](https://user-images.githubusercontent.com/82306584/128152314-5cfab36f-1ed3-44e3-8b8c-49ed518388f9.png)
- SAMPLE USAGE

``` 
        local table = {
                ['key'] = 'E', -- key
                ['event'] = 'script:myevent',
                ['title'] = 'Press [E] to BUY COLA',
                ['invehicle_title'] = 'BUY COLA',
                ['server_event'] = false, -- server event or client
                ['unpack_arg'] = false, -- send args as unpack 1,2,3,4 order
                ['fa'] = '<i class="fad fa-gas-pump"></i>',
                ['custom_arg'] = {}, -- example: {1,2,3,4}
        }
        
        TriggerEvent('renzu_popui:drawtextuiwithinput',table)
        
        - Close UI
    
        TriggerEvent('renzu_popui:closeui')
    
 ```
