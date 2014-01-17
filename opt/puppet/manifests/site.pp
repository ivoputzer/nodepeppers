class installer {

  file { '/etc/resolv.conf':
    ensure      => present,
    owner       => 'root',
    group       => 'root',
    mode        => 0644,
    content     => "nameserver 8.8.8.8\nnameserver 8.8.4.4\n",
    links       => follow,
    before      => Exec['apt-get update']
  }

  package { ['build-essential', 'python-software-properties']:
    ensure => 'present'
  }

  exec { 'locale-gen':
    path => '/usr/bin:/usr/sbin:/bin',
    command => 'locale-gen it_IT.utf8 de_DE.utf8 fr_FR.utf8 es_ES.utf8 en_GB.utf8 en_US.utf8'
  }

  exec { 'locale-update':
    path => '/usr/bin:/usr/sbin:/bin',
    command => '/usr/sbin/update-locale',
    require => Exec['locale-gen']
  }

  exec { 'add-apt-repository ppa:keithw/mosh':
    path => '/usr/bin:/usr/sbin:/bin',
    command => 'add-apt-repository -y ppa:keithw/mosh',
    before => Exec['apt-get update'],
    require => [ Package['build-essential'], Package['python-software-properties'] ]
  }

  exec { 'add-apt-repository ppa:chris-lea/node':
    path => '/usr/bin:/usr/sbin:/bin',
    command => 'add-apt-repository -y ppa:chris-lea/node.js',
    before => Exec['apt-get update'],
    require => [ Package['build-essential'], Package['python-software-properties'] ]
  }

  exec { 'apt-get update':
    path => '/usr/bin:/usr/sbin:/bin',
    command => 'apt-get update -y'
  }

  package { ['vim', 'git', 'mosh', 'nodejs']:
    ensure => 'present',
    require => Exec['apt-get update']
  }

}

include installer