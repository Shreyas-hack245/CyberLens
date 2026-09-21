from collections import Counter
from scapy.all import rdpcap, IP, TCP, UDP, DNS

def analyze_pcap(path: str):
    packets = rdpcap(path)
    protocols = Counter()
    src_ips = Counter()
    dst_ips = Counter()
    suspicious = []

    for packet in packets:
        if IP in packet:
            src_ips[packet[IP].src] += 1
            dst_ips[packet[IP].dst] += 1

            if TCP in packet:
                protocols["TCP"] += 1
                dport = int(packet[TCP].dport)
                if dport in {21, 23, 445, 3389}:
                    suspicious.append({
                        "type": "interesting_service",
                        "source": packet[IP].src,
                        "destination": packet[IP].dst,
                        "port": dport,
                        "reason": "Traffic targets a commonly investigated service port."
                    })
            elif UDP in packet:
                protocols["UDP"] += 1
            else:
                protocols["IP"] += 1

            if DNS in packet:
                protocols["DNS"] += 1

    return {
        "packet_count": len(packets),
        "protocols": dict(protocols),
        "top_source_ips": src_ips.most_common(10),
        "top_destination_ips": dst_ips.most_common(10),
        "findings": suspicious[:50],
        "note": "Heuristics are indicators for investigation, not proof of compromise."
    }
