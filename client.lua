local open = false
RegisterNUICallback('zone_event', function(data, cb)
    Event(data,data['custom_arg'] or {})
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
end)

RegisterNUICallback('close', function(data, cb)
    open = false
    SendNUIMessage({type = "reset", content = true})
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
end)

RegisterNetEvent('renzu_popui:showui')
AddEventHandler('renzu_popui:showui', function(table)
    open = true
    local t = {
        ['event'] = table.event,
        ['title'] = table.title,
        ['server_event'] = table.server_event ~= nil and table.server_event ~= false,
        ['unpack_arg'] = table.unpack or false,
        ['invehicle_title'] = table.invehicle_title or false,
        ['confirm'] = table.confirm or '[ENTER]',
        ['reject'] = table.reject or '[CLOSE]',
        ['custom_arg'] = table.custom_arg or {},
        ['use_cursor'] = table.use_cursor or false,
    }
    SendNUIMessage({type = "inzone", table = t, invehicle = IsPedInAnyVehicle(PlayerPedId())})
    SetNuiFocus(true,table.use_cursor)
    SetNuiFocusKeepInput(true)
    while open and table.use_cursor do
        DisableControlAction(1, 1, true)
        DisableControlAction(1, 2, true)
        DisableControlAction(1, 69, true)
        DisableControlAction(1, 70, true)
        DisableControlAction(1, 91, true)
        DisableControlAction(1, 92, true)
        DisableControlAction(1, 24, true)
        DisableControlAction(1, 25, true)
        DisableControlAction(1, 14, true)
        DisableControlAction(1, 15, true)
        DisableControlAction(1, 16, true)
        DisableControlAction(1, 17, true)
        DisablePlayerFiring(PlayerId(), true)
        Wait(1)
    end
end)

RegisterNetEvent('renzu_popui:closeui')
AddEventHandler('renzu_popui:closeui', function(table)
    open = false
    SendNUIMessage({type = "reset", content = true})
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
end)

function Event(data,custom_arg)
    if data == nil or data.table == nil then
        local t = data
        data = {}
        data.table = t
    end
    if custom_arg == nil then
        custom_arg = {}
    end
    if data.table['server_event'] and data.table['event'] ~= nil then
        TriggerServerEvent(data.table['event'],unfuck(table.unpack(custom_arg)))
    elseif data.table['event'] ~= nil then
        TriggerEvent(data.table['event'],unfuck(table.unpack(custom_arg)))
    end
end

function unfuck(...)
    local a = {...}
    local t = {}
    for k,v in pairs(a) do
        table.insert(t,v)
    end
    return table.unpack(t)
end