
$pairs = @(
  @{ name='AIDS';       url='https://maps.app.goo.gl/2ZQJmXEXSAL3GyYBA' },
  @{ name='ECE';        url='https://maps.app.goo.gl/S9Urm4Ura6ajbLwFA' },
  @{ name='MECH';       url='https://maps.app.goo.gl/zUNmeXUaFoWRaNnU9' },
  @{ name='CIVIL';      url='https://maps.app.goo.gl/JwfcWNn55RiSHazq5' },
  @{ name='FirstYear';  url='https://maps.app.goo.gl/bdvA8e2SvhZNjidg8' },
  @{ name='Hostel1';    url='https://maps.app.goo.gl/rQWMMeMHYruNaCPZA' },
  @{ name='Hostel2';    url='https://maps.app.goo.gl/em3MTLFgZpgnZHeLA' },
  @{ name='Admin';      url='https://maps.app.goo.gl/JpMTEeqadhyK1j789' },
  @{ name='Principal';  url='https://maps.app.goo.gl/1TQvytb2b3h4wTdq9' },
  @{ name='Library';    url='https://maps.app.goo.gl/iSiLPNCbGi2FPaTr8' },
  @{ name='Auditorium'; url='https://maps.app.goo.gl/mQ1dMEVbcLwuJRav7' }
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
    if ($loc -match '@([0-9.-]+),([0-9.-]+)') {
      Write-Host "$($p.name): lat=$($Matches[1]), lng=$($Matches[2]) | url=$loc"
    } else {
      # Try following one more redirect
      $req2 = [System.Net.HttpWebRequest]::Create($loc)
      $req2.AllowAutoRedirect = $false
      $req2.Timeout = 8000
      $req2.UserAgent = "Mozilla/5.0"
      $resp2 = $req2.GetResponse()
      $loc2 = $resp2.Headers["Location"]
      $resp2.Close()
      if ($loc2 -match '@([0-9.-]+),([0-9.-]+)') {
        Write-Host "$($p.name): lat=$($Matches[1]), lng=$($Matches[2]) | url=$loc2"
      } else {
        Write-Host "$($p.name): redirect1=$loc | redirect2=$loc2"
      }
    }
  } catch {
    Write-Host "$($p.name): ERROR=$_"
  }
}
