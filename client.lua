local open = false
local sent = false
local closing = false
RegisterNUICallback('zone_event', function(data, cb)
    sent = true
    Event(data,data.table['custom_arg'] or {})
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
    Wait(1000)
    sent = false
    TriggerEvent('renzu_popui:closeui')
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
    local count = 0
    while open and not sent and count < 20 do closing = true count = count + 1 Wait(100) end
    Wait(250)
    open = false
    SendNUIMessage({type = "reset", content = true})
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
end)

local lastpop = nil
local pop = nil
local waiting = false
RegisterNetEvent('renzu_popui:drawtextuiwithinput')
AddEventHandler('renzu_popui:drawtextuiwithinput', function(table)
    local coord = GetEntityCoords(PlayerPedId())
    if waiting or open then return end
    pop = table.title
    while IsNuiFocused() do waiting = true Wait(100) open = false end
    waiting = false
    local t = {
        ['type'] = 'drawtext',
        ['fa'] = table.fa or '<i class="fad fa-sign"></i>',
        ['event'] = table.event,
        ['title'] = table.title,
        ['server_event'] = table.server_event ~= nil and table.server_event ~= false,
        ['unpack_arg'] = table.unpack_arg or false,
        ['invehicle_title'] = table.invehicle_title or false,
        ['custom_arg'] = table.custom_arg,
        ['key'] = table.key or 'E',
    }
    Wait(100)
    open = true
    SendNUIMessage({type = "inzone", table = t, invehicle = IsPedInAnyVehicle(PlayerPedId())})
    SetNuiFocus(true,false)
    SetNuiFocusKeepInput(true)
    Wait(1000)
    Citizen.CreateThread(function()
        while open do
            if not IsNuiFocused() and not closing then
                SetNuiFocus(true,false)
                SetNuiFocusKeepInput(true)
            end
            if #(GetEntityCoords(PlayerPedId()) - coord) > 5 then
                open = false
                SendNUIMessage({type = "reset", content = true})
                SetNuiFocus(false,false)
                SetNuiFocusKeepInput(false)
                closing = true
                Wait(2000)
                break
            end
            Wait(100)
        end
        TriggerEvent('renzu_popui:closeui')
        open = false
        closing = false
        return
    end)
    lastpop = table.title
end)

RegisterNetEvent('renzu_popui:showui')
AddEventHandler('renzu_popui:showui', function(table)
    if not open then
        local coord = GetEntityCoords(PlayerPedId())
        Wait(1000)
        open = false
        if waiting then return end
        while IsNuiFocused() do waiting = true Wait(100) open = false end
        waiting = false
        Wait(1000)
        pop = table.title
        local t = {
            ['type'] = 'normal',
            ['event'] = table.event,
            ['title'] = table.title,
            ['fa'] = table.fa or '<i class="fad fa-sign"></i>',
            ['server_event'] = table.server_event ~= nil and table.server_event ~= false,
            ['unpack_arg'] = table.unpack_arg or false,
            ['invehicle_title'] = table.invehicle_title or false,
            ['confirm'] = table.confirm or '[ENTER]',
            ['reject'] = table.reject or '[CLOSE]',
            ['custom_arg'] = table.custom_arg,
            ['use_cursor'] = table.use_cursor or false,
        }
        SendNUIMessage({type = "inzone", table = t, invehicle = IsPedInAnyVehicle(PlayerPedId())})
        SetNuiFocus(true,table.use_cursor)
        SetNuiFocusKeepInput(true)
        open = true
        Citizen.CreateThread(function()
            while open do
                if not IsNuiFocused() and not closing then
                    SetNuiFocus(true,table.use_cursor)
                    SetNuiFocusKeepInput(true)
                end
                Wait(100)
            end
            open = false
            closing = false
            return
        end)
        Citizen.CreateThread(function()
            while open do
                if not IsNuiFocused() and not closing then
                    SetNuiFocus(true,false)
                    SetNuiFocusKeepInput(true)
                end
                if #(GetEntityCoords(PlayerPedId()) - coord) > 5 then
                    open = false
                    SendNUIMessage({type = "reset", content = true})
                    SetNuiFocus(false,false)
                    SetNuiFocusKeepInput(false)
                    closing = true
                    Wait(2000)
                    break
                end
                Wait(100)
            end
            TriggerEvent('renzu_popui:closeui')
            open = false
            closing = false
            return
        end)
        lastpop = table.title
        while open and table.use_cursor and not closing do
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
    end
    SetNuiFocus(false,false)
    SetNuiFocusKeepInput(false)
end)

RegisterNetEvent('renzu_popui:closeui')
AddEventHandler('renzu_popui:closeui', function(force)
    if open or force then
        open = false
        SendNUIMessage({type = "reset", content = true})
        SetNuiFocus(false,false)
        SetNuiFocusKeepInput(false)
    end
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