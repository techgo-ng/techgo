{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.python311Packages.flask
    pkgs.python311Packages.feedparser
    pkgs.python311Packages.requests
    pkgs.nodejs_20
    pkgs.vite
  ];
}