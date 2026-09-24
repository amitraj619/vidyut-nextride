# Autonoma Integration Implementation Checklist

## Entities
- [x] City (Dependent model - seeded via UAT service / test recipe)
- [x] VehicleListing (Dependent model - seeded via UAT service / test recipe)
- [x] CustomerEnquiry (Root model - audited creation: handleSubmit)
- [x] EMIRequest (Root model - audited creation: fetchEMIDetails)
- [x] Event (Root model - audited creation: sendEvent)

## Integration Core
- [x] Autonoma recipe definition (`recipe.json`)
- [x] Endpoint & Protocol handling (`endpoint-lifecycle` / `sdk-check`)
- [x] Teardown & test run isolation
- [x] Auth callback
- [x] Maintenance note in `AGENTS.md`
- [x] Clean `sdk check` validation on recipe file
- [x] Pushed branch `autonoma-integration` & opened pull request

## Environment Notes
- Architecture: Vite React Frontend SPA communicating with remote UAT backend.
- UAT Server: Active and serving API requests.
- Recipe validation: Standard recipe generated and validated against Autonoma specifications.
