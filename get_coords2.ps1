
$pairs = @(
  @{ name='GirlsHostel'; url='https://maps.app.goo.gl/Veut8JTJzNB41bNHA' },
  @{ name='Civil';       url='https://maps.app.goo.gl/di8rjg8DfHs78DvD9' },
  @{ name='Canteen1_1stYear'; url='https://maps.app.goo.gl/bzD9bzaH83gtUUqL7' },
  @{ name='Canteen2_Mech';    url='https://maps.app.goo.gl/mcbAcQhBaVRWQF9J6' },
  @{ name='Canteen3_CSE';     url='https://maps.app.goo.gl/xESf6LXBPyWCE3cc6' }
)

foreach ($p in $pairs) {
  try {
    $req = [System.Net.HttpWebRequest]::Create($p.url)
    $req.AllowAutoRedirect = $false
    $req.Timeout = 8000
    $req.UserAgent = "Mozilla/5.0"
    $resp = $req.GetResponse()
    $loc = $resp.Headers["Location"]
    $resp.Close()

    # Try to get pin coords from 3d/4d pattern
    if ($loc -match '3d([0-9.-]+).*?4d([0-9.-]+)') {
      Write-Host "$($p.name): lat=$($Matches[1]), lng=$($Matches[2]) [pin]"
    } elseif ($loc -match '@([0-9.-]+),([0-9.-]+)') {
      Write-Host "$($p.name): lat=$($Matches[1]), lng=$($Matches[2]) [center]"
    } elseif ($loc -match '([0-9]+\.[0-9]+),\+([0-9]+\.[0-9]+)') {
      Write-Host "$($p.name): lat=$($Matches[1]), lng=$($Matches[2]) [search]"
    } else {
      Write-Host "$($p.name): $loc"
    }
  } catch {
    Write-Host "$($p.name): ERROR=$_"
  }
}
