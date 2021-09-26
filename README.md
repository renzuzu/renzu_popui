# renzu_popui
POPUP UI to Fire Events instead of using while loop controlpressed - FIVEM (0.00 ms idle or active)

# Methods
# DrawTEXTUI

- DEMO
![image](https://user-images.githubusercontent.com/82306584/134336515-048ae9f2-8b68-4a28-8845-410efcf76e40.png)
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
 
 # POPUI
- DEMO
![image](https://user-images.githubusercontent.com/82306584/134346087-07bb9bdf-1ff6-4514-93be-333510497316.png)

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

 
 # Implementation Sample
 - code below is for sample do not copy and paste it
 - OLD CODE to convert (code sample is using drawtext loop 0) the high usage for resmon
```
        Citizen.CreateThread(function()
            while true do
                local sleep = 500
                local coords = GetEntityCoords(PlayerPedId())
                    for i, v in pairs(Config.Locations) do
                        local pos = Config.Locations[i]
                        local dist = GetDistanceBetweenCoords(pos["x"], pos["y"], pos["z"] + 0.98, coords, true)
                        if dist <= 1.5 then
                            -- TO REPLACE CODE START
                            sleep = 5
                            DrawText3D(pos["x"], pos["y"], pos["z"], "Press [E] to Buy Jerry Can")
                            if IsControlJustPressed(0, Keys["E"]) then
                                TriggerEvent('script:myevent')
                            end
                            -- TO REPLACE CODE END
                        end
                    end
                Citizen.Wait(sleep)
            end
        end)
```
- New Code with DrawtextUI
```
        Citizen.CreateThread(function()
            while true do
                local sleep = 500
                local coords = GetEntityCoords(PlayerPedId())
                    for i, v in pairs(Config.Locations) do
                        local pos = Config.Locations[i]
                        local dist = GetDistanceBetweenCoords(pos["x"], pos["y"], pos["z"] + 0.98, coords, true)
                        if dist <= 3.5 then
                            -- NEW CODE START
                            local table = {
                                ['key'] = 'E', -- key
                                ['event'] = 'script:myevent',
                                ['title'] = 'Press [E] to BUY Jerry Can',
                                ['fa'] = '<i class="fad fa-gas-pump"></i>',
                                ['custom_arg'] = {}, -- example: {1,2,3,4}
                            }
                           TriggerEvent('renzu_popui:drawtextuiwithinput',table) -- show the ui
                           while dist <= 3.5 do -- wait for dist become > 3.5 and close the ui once its > 3.5
                                coords = GetEntityCoords(PlayerPedId() -- coords need to be here to be refreshed ea 500ms
                                dist = GetDistanceBetweenCoords(pos["x"], pos["y"], pos["z"] + 0.98, coords, true)
                                Wait(500)
                           end
                           TriggerEvent('renzu_popui:closeui') -- close the ui once dist is > 3.5
                           Wait(1000) -- wait 1 second
                           -- NEW CODE END
                        end
                    end
                Citizen.Wait(sleep)
            end
        end)
```
- New Code with POPUI
```
        Citizen.CreateThread(function()
            while true do
                local sleep = 500
                local coords = GetEntityCoords(PlayerPedId())
                    for i, v in pairs(Config.Locations) do
                        local pos = Config.Locations[i]
                        local dist = GetDistanceBetweenCoords(pos["x"], pos["y"], pos["z"] + 0.98, coords, true)
                        if dist <= 3.5 then
                            -- NEW CODE START
                            local table = {
                                ['event'] = 'opengarage',
                                ['title'] = 'Garage A',
                                ['confirm'] = '[ENTER]',
                                ['reject'] = '[CLOSE]',
                                ['fa'] = '<i class="fad fa-gas-pump"></i>',
                                ['use_cursor'] = false, -- USE MOUSE CURSOR INSTEAD OF INPUT (ENTER)
                           }
                           TriggerEvent('renzu_popui:showui',table) -- show the ui
                           while dist <= 3.5 do -- wait for dist become > 3.5 and close the ui once its > 3.5
                                coords = GetEntityCoords(PlayerPedId() -- coords need to be here to be refreshed ea 500ms
                                dist = GetDistanceBetweenCoords(pos["x"], pos["y"], pos["z"] + 0.98, coords, true)
                                Wait(500)
                           end
                           TriggerEvent('renzu_popui:closeui') -- close the ui once dist is > 3.5
                           Wait(1000) -- wait 1 second
                           -- NEW CODE END
                        end
                    end
                Citizen.Wait(sleep)
            end
        end)
```
